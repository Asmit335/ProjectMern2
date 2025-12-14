import { Request, Response } from "express";
import Product from "../database/model/Product";

class ProductController {
  public static async addProduct(req: Request, res: Response): Promise<void> {
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
    });
    res.status(200).json({
      message: "Product added Successfully.",
    });
  }
}

export default ProductController;
