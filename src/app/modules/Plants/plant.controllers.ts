import { HttpStatusCode } from "axios";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PlantServices } from "./plant.services";

const createPlant = catchAsync(async (req, res) => {
  const result = await PlantServices.createPlantIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Plant created successfully",
    data: result,
  });
});

const getAllPlant = catchAsync(async (req, res) => {
  const result = await PlantServices.getAllPlantFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "All Plant Fetched successfully",
    data: result,
  });
});

const getPlantById = catchAsync(async (req, res) => {
  const result = await PlantServices.getPlantByIdFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Plant fetched successfully",
    data: result,
  });
});

const deletePlantById = catchAsync(async (req, res) => {
  const result = await PlantServices.deletePlantByIdFromDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Plant fetched successfully",
    data: result,
  });
});

const updatePlant = catchAsync(async (req, res) => {
  const result = await PlantServices.updatePlantIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Plant updated successfully",
    data: result,
  });
});

const getReviewsByPlantId = catchAsync(async (req, res) => {
  const plantId = req.params.id;
  const result = await PlantServices.getReviewsByPlantId(plantId);

  sendResponse(res, {
    success: true,
    statusCode: HttpStatusCode.Ok,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const PlantControllers = {
  createPlant,
  getAllPlant,
  getPlantById,
  updatePlant,
  deletePlantById,
  getReviewsByPlantId,
};
