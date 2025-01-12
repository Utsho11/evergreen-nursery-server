import express from "express";
import { UserControllers } from "./user.controllers";

const router = express.Router();

router.post("/create-order", UserControllers.createOrder);

export const UserRoutes = router;
