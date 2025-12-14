import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./database/connection";
dotenv.config();
const app: Application = express();
const PORT = Number(process.env.PORT);
import userRoute from "./route/userRoute";
import productRoute from "./route/productRoute";
import deleteRoute from "./route/productRoute";
import adminSeeder from "./adminSeeder";
app.use(express.json());

adminSeeder();
app.use("/", userRoute);
app.use("/admin/addProduct", productRoute);
app.use("/admin/deleteProduct", deleteRoute);

app.listen(PORT, async () => {
  console.log(`Server is running in Port ${PORT}`);
});
