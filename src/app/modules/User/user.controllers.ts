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

const createReview = catchAsync(async (req, res) => {
  const result = await UserServices.createReviewIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Created,
    message: "Review created successfully",
    data: result,
  });
});

const getUnreviewedCart = catchAsync(async (req, res) => {
  const result = await UserServices.getUnreviewedCartItems(req.user.email);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Review fetched successfully",
    data: result,
  });
});

const getOrder = catchAsync(async (req, res) => {
  const result = await UserServices.getOrderFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Order fetched successfully",
    data: result,
  });
});
const createBlog = catchAsync(async (req, res) => {
  const result = await UserServices.createBlog(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Created,
    message: "Blog created successfully",
    data: result,
  });
});
const getBlogByUser = catchAsync(async (req, res) => {
  const result = await UserServices.getBlogByUser(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Blog fetched successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleBlog(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Blog fetched successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await UserServices.deleteBlog(req);
  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Blog deleted successfully",
    data: null,
  });
});

export const UserControllers = {
  createOrder,
  createReview,
  createBlog,
  getUnreviewedCart,
  getOrder,
  getBlogByUser,
  deleteBlog,
  getSingleBlog,
};
