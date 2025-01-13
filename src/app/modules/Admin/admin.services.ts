import { Request } from "express";
import { Order } from "../User/order.model";
import { USER_ROLE, USER_STATUS } from "../User/user.constant";
import { User } from "../User/user.model";

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

export const AdminServices = {
  getAllTransactionsFromDB,
  getAllUsersFromDB,
  changeUserStatusIntoDB,
};
