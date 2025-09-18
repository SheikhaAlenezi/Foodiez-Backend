import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructions: { type: String },
    description: { type: String },
    prep: { type: String },
    serving: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    ingredients: [
      {
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        amount: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
