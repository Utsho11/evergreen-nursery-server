import express from "express";
import { parseBody } from "../../middlewares/bodyParser";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { PlantControllers } from "./plant.controllers";

const router = express.Router();

router.post(
  "/create-plant",
  auth(USER_ROLE.ADMIN),
  multerUpload.fields([{ name: "files" }]),
  parseBody,
  PlantControllers.createPlant
);

router.get("/get-all-plants", PlantControllers.getAllPlant);

router.get("/get-plant/:id", PlantControllers.getPlantById);

router.patch(
  "/update-plant/:id",
  auth(USER_ROLE.ADMIN),
  multerUpload.fields([{ name: "files" }]),
  parseBody,
  PlantControllers.updatePlant
);

router.delete(
  "/delete-plant/:id",
  auth(USER_ROLE.ADMIN),
  PlantControllers.deletePlantById
);

export const PlantRoutes = router;
