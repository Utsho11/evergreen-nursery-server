import express from "express";
import { UserControllers } from "./user.controllers";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";

const router = express.Router();

router.post(
  "/create-order",
  auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN),
  UserControllers.createOrder
);
router.post(
  "/create-review",
  auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN),
  UserControllers.createReview
);

router.post(
  "/create-blog",
  auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN),
  multerUpload.single("file"),
  parseBody,
  UserControllers.createBlog
);

router.get(
  "/get-review",
  auth(USER_ROLE.CUSTOMER),
  UserControllers.getUnreviewedCart
);

router.get(
  "/get-blog",
  auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN),
  UserControllers.getBlogByUser
);

router.get("/get-single-blog/:id", UserControllers.getSingleBlog);

router.get("/get-order", auth(USER_ROLE.CUSTOMER), UserControllers.getOrder);

router.delete(
  "/delete-blog/:id",
  auth(USER_ROLE.CUSTOMER, USER_ROLE.ADMIN),
  UserControllers.deleteBlog
);

export const UserRoutes = router;
