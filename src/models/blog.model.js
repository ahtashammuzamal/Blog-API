import { model, Schema, SchemaTypes } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);
