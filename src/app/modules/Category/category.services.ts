import { Request } from "express";
import { Category } from "./category.model";
import AppError from "../../errors/AppError";
import { HttpStatusCode } from "axios";

const createCategoryIntoDB = async (req: Request) => {
  const data = req.body;
  const imgUrl = req.file?.path;
  const categoryData = {
    ...data,
    image: imgUrl,
  };
  const result = await Category.create(categoryData);

  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

const getCategoryByIdFromDB = async (req: Request) => {
  const categoryId = req.params.id;
  const result = await Category.findById(categoryId);
  return result;
};

const deleteCategoryByIdFromDB = async (req: Request) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new AppError(HttpStatusCode.NotFound, "Category not found!");
  }

  await Category.findByIdAndDelete(categoryId);

  return null;
};

const updateCategoryIntoDB = async (req: Request) => {
  const categoryId = req.params.id;
  const updateData = req.body;
  const imgUrl = req.file?.path;
  const categoryData = {
    image: imgUrl,
    ...updateData,
  };

  const category = await Category.findByIdAndUpdate(categoryId, categoryData, {
    new: true,
  });
  return category;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getCategoryByIdFromDB,
  deleteCategoryByIdFromDB,
  updateCategoryIntoDB,
};
