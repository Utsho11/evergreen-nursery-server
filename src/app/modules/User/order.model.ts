import mongoose, { model, Schema } from "mongoose";

interface IOrder {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  cartItems: Array<{
    productId: mongoose.Schema.Types.ObjectId;
    name: string;
    image: string;
    quantity: number;
    discount: number;
    price: number;
    reviewed: boolean;
  }>;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    userInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      location: { type: String, required: true },
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        quantity: { type: Number, required: true },
        discount: { type: Number, required: true },
        price: { type: Number, required: true },
        reviewed: { type: Boolean, default: false },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
