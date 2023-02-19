import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: String,
    tags: [String],
    description: String,
    price: Number,
    img: [String],
    launchDate: Date,
    category: String,
    rating: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
