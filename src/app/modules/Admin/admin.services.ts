import { Request } from "express";
import { Order } from "../User/order.model";
import { USER_ROLE, USER_STATUS } from "../User/user.constant";
import { User } from "../User/user.model";
import { Blog } from "../User/blog.model";

const getAllTransactionsFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({ role: USER_ROLE.CUSTOMER });

  return result;
};

const changeUserStatusIntoDB = async (req: Request) => {
  const { userId } = req.body;
  // console.log(req.body);

  const user = await User.findById(userId);

  // console.log(user);

  if (user?.status === USER_STATUS.ACTIVE) {
    await User.findByIdAndUpdate(
      userId,
      { status: USER_STATUS.BLOCKED },
      { new: true }
    );
  } else {
    await User.findByIdAndUpdate(
      userId,
      { status: USER_STATUS.ACTIVE },
      { new: true }
    );
  }
  return null;
};

const changeBlogStatus = async (req: Request) => {
  const { blogId } = req.body;
  // console.log(req.body);

  const blog = await Blog.findById(blogId);

  // console.log(blog);

  if (blog?.status === USER_STATUS.ACTIVE) {
    await Blog.findByIdAndUpdate(
      blogId,
      { status: USER_STATUS.BLOCKED },
      { new: true }
    );
  } else {
    await Blog.findByIdAndUpdate(
      blogId,
      { status: USER_STATUS.ACTIVE },
      { new: true }
    );
  }
  return null;
};

const getAllBlogs = async () => {
  const result = await Blog.find().populate("author");
  return result;
};

export const AdminServices = {
  getAllTransactionsFromDB,
  getAllUsersFromDB,
  changeUserStatusIntoDB,
  getAllBlogs,
  changeBlogStatus,
};
