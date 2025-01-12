import AppError from "../errors/AppError";
import { catchAsync } from "../utils/catchAsync";

export const parseBody = catchAsync(async (req, res, next) => {
  if (!req.body) {
    throw new AppError(400, "Please provide data in the body under data key");
  }
  if (req.body.data) {
    req.body = JSON.parse(req.body.data);
  }

  next();
});
