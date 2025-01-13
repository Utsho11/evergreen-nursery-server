import express from "express";
import { parseBody } from "../../middlewares/bodyParser";
import { multerUpload } from "../../config/multer.config";
import { AuthControllers } from "./auth.controllers";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { validateRequestCookies } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  multerUpload.single("file"),
  parseBody,
  AuthControllers.registerUser
);

router.post("/login", AuthControllers.loginUser);

router.get(
  "/get-me",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  AuthControllers.getMe
);

router.get("/get-review", auth(USER_ROLE.ADMIN), AuthControllers.getAllReviews);

router.post(
  "/refresh-token",
  validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const Authroutes = router;
