import { model, Schema, Types } from "mongoose";

type TBlog = {
  title: string;
  blog: string;
  image: string;
  author: Types.ObjectId;
  status: "ACTIVE" | "BLOCKED";
};

const BlogSchema: Schema = new Schema<TBlog>(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model<TBlog>("Blog", BlogSchema);
