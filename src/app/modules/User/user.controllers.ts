import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const createOrder = catchAsync(async (req, res) => {
  const result = await UserServices.createOrderIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Created,
    message: "Order created successfully",
    data: result,
  });
});

export const UserControllers = {
  createOrder,
};
