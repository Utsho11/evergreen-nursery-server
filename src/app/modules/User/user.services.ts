import { Request } from "express";
import { User } from "./user.model";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";
import { Order } from "./order.model";
import { initiatePayment } from "../../utils/payment.utils";
import { Review } from "./review.model";
import { Blog } from "./blog.model";

const registerUserIntoDB = async (req: Request) => {
  const data = req.body;
  const imgUrl = req.file?.path;
  const userData = {
    ...data,
    profilePhoto: imgUrl,
  };

  const newUser = await User.create(userData);
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    mobileNumber: newUser.mobileNumber,
    role: newUser.role,
    status: newUser.status,
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

const createOrderIntoDB = async (req: Request) => {
  const orderData = req.body;
  const transactionId = `TXN-${Date.now()}`;
  const data = {
    ...orderData,
    status: "Pending",
    paymentStatus: "Pending",
    transactionId,
  };

  await Order.create(data);

  const paymentData = {
    transactionId,
    name: orderData.userInfo.name,
    email: orderData.userInfo.email,
    location: orderData.userInfo.location,
    phone: orderData.userInfo.phone,
    totalAmount: orderData.totalPrice,
  };

  const sessionData = await initiatePayment(paymentData);

  return sessionData;
};

const createReviewIntoDB = async (req: Request) => {
  const payload = await req.body;
  const { itemId, ...rest } = payload;

  await Order.updateOne(
    { "cartItems._id": itemId },
    { $set: { "cartItems.$.reviewed": true } }
  );

  const reviewData = {
    ...rest,
    user: req.user._id,
  };
  const result = await Review.create(reviewData);

  // console.log(result);

  return result;
};

const getUnreviewedCartItems = async (userEmail: string) => {
  try {
    // Step 1: Find all orders for the specific user
    const userOrders = await Order.find({
      "userInfo.email": userEmail,
    });

    if (!userOrders || userOrders.length === 0) {
      // console.log("No orders found for the user.");
      return [];
    }

    // Step 2: Extract unreviewed cart items from all orders
    const unreviewedCartItems = userOrders.flatMap((order) =>
      order.cartItems.filter((item) => item.reviewed === false)
    );

    // console.log("Unreviewed Cart Items:", unreviewedCartItems);

    return unreviewedCartItems;
  } catch {
    // console.error("Error fetching unreviewed cart items:", error);
    throw new Error("Could not fetch unreviewed cart items.");
  }
};

const getOrderFromDB = async (req: Request) => {
  const result = await Order.find({ "userInfo.email": req.user.email });
  return result;
};

const createBlog = async (req: Request) => {
  const data = req.body;
  const imgUrl = req.file?.path;

  const blogData = {
    ...data,
    image: imgUrl,
  };

  const result = await Blog.create(blogData);
  return result;
};

const getBlogByUser = async (req: Request) => {
  const email = req.user.email; // Assuming req.user contains the logged-in user's email

  const blogs = await Blog.find()
    .populate({
      path: "author",
      match: { email },
    })
    .exec();

  const filteredBlogs = blogs.filter((blog) => blog.author !== null);

  return filteredBlogs;

  // return result;
};

const getSingleBlog = async (req: Request) => {
  const result = await Blog.findById(req.params.id);
  return result;
};

const deleteBlog = async (req: Request) => {
  const result = await Blog.findByIdAndDelete(req.params.id);
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  createOrderIntoDB,
  createReviewIntoDB,
  getUnreviewedCartItems,
  getOrderFromDB,
  createBlog,
  getBlogByUser,
  deleteBlog,
  getSingleBlog,
};
