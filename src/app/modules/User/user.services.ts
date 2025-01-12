import { Request } from "express";
import { User } from "./user.model";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";
import { Order } from "./order.model";
import { initiatePayment } from "../../utils/payment.utils";

const registerUserIntoDB = async (req: Request) => {
  const data = req.body;
  const imgUrl = req.file?.path;
  const userData = {
    ...data,
    profilePhoto: imgUrl,
  };

  const newUser = await User.create(userData);
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    mobileNumber: newUser.mobileNumber,
    role: newUser.role,
    status: newUser.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const createOrderIntoDB = async (req: Request) => {
  const orderData = req.body;
  const transactionId = `TXN-${Date.now()}`;
  const data = {
    ...orderData,
    status: "Pending",
    paymentStatus: "Pending",
    transactionId,
  };

  await Order.create(data);

  const paymentData = {
    transactionId,
    name: orderData.userInfo.name,
    email: orderData.userInfo.email,
    location: orderData.userInfo.location,
    phone: orderData.userInfo.phone,
    totalAmount: orderData.totalPrice,
  };

  const sessionData = await initiatePayment(paymentData);

  return sessionData;
};

export const UserServices = {
  registerUserIntoDB,
  createOrderIntoDB,
};
