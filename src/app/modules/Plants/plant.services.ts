import { Request } from "express";
import AppError from "../../errors/AppError";
import { HttpStatusCode } from "axios";
import { Plant } from "./plant.model";
import { PlantQueryBuilder } from "../../builder/QueryBuilder";
import { TImageFiles } from "../../interfaces/image.interface";
import { Review } from "../User/review.model";

const createPlantIntoDB = async (req: Request) => {
  const data = req.body;
  const imgUrls = req.files;
  const { files } = imgUrls as TImageFiles;

  //   console.log(req.files);

  data.images = files?.map((image) => image.path);

  const result = await Plant.create(data);

  return result;
  //   return null;
};

const getAllPlantFromDB = async (req: Request) => {
  const query = req.query;

  // Initialize the page and limit
  const page = Number(query.page) || 1; // Default to 1 if no page is provided
  const limit = Number(query.limit) || 10; // Default to 10 items per page if no limit is provided

  const skip = (page - 1) * limit; // Calculate the skip value for pagination

  const itemQuery = new PlantQueryBuilder(
    Plant.find().populate("category"),
    query
  )
    .search(["title", "description", "category.name"])
    .filter()
    .sort()
    .fields()
    .paginate();

  itemQuery.modelQuery = itemQuery.modelQuery.skip(skip).limit(limit);

  const result = await itemQuery.modelQuery;

  return result;
};

const getPlantByIdFromDB = async (req: Request) => {
  const plantId = req.params.id;
  const result = await Plant.findById(plantId).populate("category");
  return result;
};

const deletePlantByIdFromDB = async (req: Request) => {
  const plantId = req.params.id;
  const category = await Plant.findById(plantId);

  if (!category) {
    throw new AppError(HttpStatusCode.NotFound, "Category not found!");
  }

  await Plant.deleteOne({ _id: plantId });

  return null;
};

const updatePlantIntoDB = async (req: Request) => {
  const plantId = req.params.id;
  const updateData = req.body;
  const imgUrl = req.file?.path;
  const plantData = {
    image: imgUrl,
    ...updateData,
  };

  const plant = await Plant.findByIdAndUpdate(plantId, plantData, {
    new: true,
  });
  return plant;
};

const getReviewsByPlantId = async (plantId: string) => {
  const result = await Review.find({ plantId: plantId }).populate("user");
  return result;
};

export const PlantServices = {
  createPlantIntoDB,
  getAllPlantFromDB,
  updatePlantIntoDB,
  deletePlantByIdFromDB,
  getPlantByIdFromDB,
  getReviewsByPlantId,
};
