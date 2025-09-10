import express from "express";
import connectDB from "../src/config/database";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import morgan from "morgan";
import usersRoutes from "./api/users/users.routes";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", usersRoutes);
app.use("/api/");

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
