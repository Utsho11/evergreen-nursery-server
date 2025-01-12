import { ObjectId } from "mongoose";

export type TPlant = {
  title: string;
  description: string;
  price: number;
  rating: number;
  discount: number;
  category: ObjectId;
  quantity: number;
  images: string[];
};
