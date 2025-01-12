import express from "express";
import { Authroutes } from "../modules/Auth/auth.route";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { PlantRoutes } from "../modules/Plants/plant.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: Authroutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/plant",
    route: PlantRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
