import express from "express";
import connectDB from "../src/config/database";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import morgan from "morgan";
import userRouter from "../src/api/users/users.routes";
import categoryRouter from "./api/category/category.routes";
import recipeRouter from "./api/recipe/recipe.routes";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/users/category", categoryRouter);
app.use("/api/users/recipe", recipeRouter);

connectDB();
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
