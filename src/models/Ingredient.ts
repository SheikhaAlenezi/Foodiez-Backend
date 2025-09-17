import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    amount: { type: String, required: false },
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

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

export default Ingredient;
