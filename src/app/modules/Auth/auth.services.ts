import { Request } from "express";
import { User } from "../User/user.model";
import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (req: Request) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(req.body.email);

  if (!user) {
    throw new AppError(HttpStatusCode.NotFound, "This user is not found!");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "BLOCKED") {
    throw new AppError(HttpStatusCode.Forbidden, "This user is blocked!");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(req.body?.password, user?.password)))
    throw new AppError(HttpStatusCode.Forbidden, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMeFromDB = async (req: Request) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) throw new AppError(HttpStatusCode.NotFound, "User not found");
  return user;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(HttpStatusCode.NotFound, "This user is not found!");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "BLOCKED") {
    throw new AppError(HttpStatusCode.Forbidden, "This user is blocked!");
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  getMeFromDB,
  refreshToken,
};
