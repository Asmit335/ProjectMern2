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
          attributes: ["email", "userName"],
        },
      ],
    });
    res.status(200).json({
      message: "Product fetched Successfully.",
      data: data,
    });
  }
  public static async getSingleProduct(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const data = await Product.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "No product with the given Id.",
      });
      return;
    }
    res.status(200).json({
      message: "Product fetched Successfully.",
      data: data,
    });
  }
  public static async deleteSingleProduct(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const data = await Product.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "No product with the given Id.",
      });
      return;
    }
    await Product.destroy();
    res.status(200).json({
      message: "Product deleted Successfully.",
    });
  }

  public static async updateProduct(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const { productName, productStockQty, productDescription, productPrice } =
      req.body;
    const data = await Product.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "No product with the given Id.",
      });
      return;
    }
    let imageUrl = data.productImg;
    if (req.file) {
      imageUrl = req.file.path;
    }
    await Product.update(
      {
        productName,
        productPrice,
        productDescription,
        productStockQty,
        imageUrl,
      },
      { where: { id } }
    );
    res.status(200).json({
      message: "Product updated Successfully.",
    });
    return;
  }
}

export default productController;
