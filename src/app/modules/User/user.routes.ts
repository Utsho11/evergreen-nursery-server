import express from "express";
import { UserControllers } from "./user.controllers";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create-order", UserControllers.createOrder);
router.post(
  "/create-review",
  auth(USER_ROLE.CUSTOMER),
  UserControllers.createReview
);
router.get(
  "/get-review",
  auth(USER_ROLE.CUSTOMER),
  UserControllers.getUnreviewedCart
);

router.get("/get-order", auth(USER_ROLE.CUSTOMER), UserControllers.getOrder);
export const UserRoutes = router;
