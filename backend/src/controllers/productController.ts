import { Response } from "express";
import { AuthRequest } from "../middleware/authmiddleware";
import Product from "../database/model/product";
import User from "../database/model/useModel";

class productController {
  public static async addProduct(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const userId = req.user?.id;
    const { productName, productPrice, productStockQty, productDescription } =
      req.body;
    let fileName;
    if (req.file) {
      fileName = req.body.path;
    } else {
      fileName = "https://images/unplash.com/photo";
    }
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productStockQty
    ) {
      res.status(400).json({
        message: "Please fill all the details",
      });
      return;
    }

    await Product.create({
      productName,
      productPrice,
      productStockQty,
      productDescription,
      productImg: fileName,
      userId: userId,
    });
    res.status(200).json({
      message: "Product added Successfully.",
    });
  }

  public static async getAllProducts(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    res.status(200).json({
      message: "Product fetched Successfully.",
      data: data,
    });
  }
}

export default productController;
