import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { AdminControllers } from "./admin.controllers";

const router = express.Router();

router.get(
  "/get-all-transactions",
  auth(USER_ROLE.ADMIN),
  AdminControllers.getAllTransactions
);

router.get(
  "/get-all-users",
  auth(USER_ROLE.ADMIN),
  AdminControllers.getAllUsers
);

router.patch(
  "/change-user-status",
  auth(USER_ROLE.ADMIN),
  AdminControllers.changeUserStatus
);

router.patch(
  "/change-blog-status",
  auth(USER_ROLE.ADMIN),
  AdminControllers.changeBlogStatus
);

router.get("/get-all-blogs", AdminControllers.getAllBlogs);

export const AdminRoutes = router;
