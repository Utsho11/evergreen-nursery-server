import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "../User/user.services";
import { AuthServices } from "./auth.services";

import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDB(req);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Created,
    message: "User registered successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await AuthServices.getMeFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "User Fetched successfully",
    data: result, // Return the created user object as data.
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: HttpStatusCode.Ok,
    success: true,
    message: "Access token retrieved successfully!",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllReviewsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Review Fetched successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  getMe,
  // changePassword,
  refreshToken,
  getAllReviews,
};
