import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    recipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
