import { Sequelize } from "sequelize-typescript";
import User from "./model/useModel";
import Product from "./model/product";
import Category from "./model/category";

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  dialect: "mysql",
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD ?? "",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  models: [User, Product, Category],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log("Synced!!!");
});

//RelationShip
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasOne(Product, { foreignKey: "categoryId" });

export default sequelize;
