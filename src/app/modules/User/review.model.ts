import { model, Schema, Types } from "mongoose";

type TReview = {
  user: Types.ObjectId;
  plantId: string;
  review: string;
};

const ReviewSchema: Schema = new Schema<TReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    plantId: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<TReview>("Review", ReviewSchema);
