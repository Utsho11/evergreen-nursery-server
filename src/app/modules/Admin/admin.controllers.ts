import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.services";

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllTransactionsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "All Transactions Fetched successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "All Transactions Fetched successfully",
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const result = await AdminServices.changeUserStatusIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Changed User Status successfully",
    data: result,
  });
});

const changeBlogStatus = catchAsync(async (req, res) => {
  const result = await AdminServices.changeUserStatusIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Changed Blog Status successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllBlogs();
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "All Blogs are fetched successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllTransactions,
  getAllUsers,
  changeUserStatus,
  changeBlogStatus,
  getAllBlogs,
};
