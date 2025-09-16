import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String, required: true },
    description: { type: String, required: true },
    instructions: { type: String, required: true },
    prep: { type: String, required: true },
    serving: { type: String, required: true },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    ingredient: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
