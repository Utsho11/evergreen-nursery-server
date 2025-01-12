import express from "express";
import { parseBody } from "../../middlewares/bodyParser";
import { multerUpload } from "../../config/multer.config";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { CategoryControllers } from "./category.controllers";

const router = express.Router();

router.post(
  "/create-category",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("file"),
  parseBody,
  CategoryControllers.createCategory
);

router.get("/get-all-categories", CategoryControllers.getAllCategory);

router.get("/get-category/:id", CategoryControllers.getCategoryById);

router.patch(
  "/update-category/:id",
  auth(USER_ROLE.ADMIN),
  multerUpload.single("file"),
  parseBody,
  CategoryControllers.updateCategory
);

router.delete(
  "/delete-category/:id",
  auth(USER_ROLE.ADMIN),
  CategoryControllers.deleteCategoryById
);

export const CategoryRoutes = router;
