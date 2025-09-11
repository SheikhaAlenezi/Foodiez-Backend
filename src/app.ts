import express from "express";
import connectDB from "../src/config/database";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import morgan from "morgan";
import userRouter from "../src/api/users/users.routes";
import categoryRouter from "../src/api/users/category/categories.routes";
import recipeRouter from "../src/api/users/recipe/recipes.routes";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/recipes", recipeRouter);

connectDB();
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
