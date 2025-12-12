import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./database/connection";
dotenv.config();
const app: Application = express();
const PORT = Number(process.env.PORT);
import userRoute from "./route/userRoute";
app.use(express.json());

app.use("/", userRoute);

app.listen(PORT, async () => {
  console.log(`Server is running in Port ${PORT}`);
});
