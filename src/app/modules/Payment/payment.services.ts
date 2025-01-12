import { readFileSync } from "fs";
import { resolve } from "path";
import { verifyPayment } from "../../utils/payment.utils";
import { Order } from "../User/order.model";
import AppError from "../../errors/AppError";
import { HttpStatusCode } from "axios";

interface UpdateTransactionAndOrderParams {
  paymentStatus: string;
  status: string;
}
const confirmationService = async (transactionId: string, status: string) => {
  if (!transactionId) {
    throw new AppError(
      HttpStatusCode.ExpectationFailed,
      "Transaction ID is required."
    );
  }

  // console.log("Processing Transaction ID:", transactionId);

  const response = await verifyPayment(transactionId);
  // console.log("Payment Verification Response:", response);

  const successFilePath = resolve(
    __dirname,
    "../../../../public/confirmation.html"
  );
  const failedFilePath = resolve(__dirname, "../../../../public/failed.html");

  const updateTransactionAndOrder = async (
    transactionId: string,
    paymentStatus: UpdateTransactionAndOrderParams["paymentStatus"],
    status: UpdateTransactionAndOrderParams["status"]
  ): Promise<void> => {
    await Order.updateOne(
      { transactionId }, // Filter
      { $set: { paymentStatus, status } } // Update
    );
  };

  if (
    status === "success" &&
    response &&
    response.pay_status === "Successful"
  ) {
    await updateTransactionAndOrder(transactionId, "Paid", "Completed");
    return readFileSync(successFilePath, "utf-8");
  }
  if (status === "failed") {
    await updateTransactionAndOrder(transactionId, "Failed", "Cancelled");
    return readFileSync(failedFilePath, "utf-8");
  }
};

export const PaymentService = {
  confirmationService,
};
