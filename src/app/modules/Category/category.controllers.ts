import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.services";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "All Category Fetched successfully",
    data: result,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategoryByIdFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Category fetched successfully",
    data: result,
  });
});

const deleteCategoryById = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategoryByIdFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Category fetched successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.updateCategoryIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Category updated successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategory,
};
