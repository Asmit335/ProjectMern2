import express, { Router } from "express";
import multer from "multer";
import { storage } from "../middleware/multerMiddleware";
import authmiddleware, { Role } from "../middleware/authmiddleware";
import ProductController from "../controllers/productController";

const router: Router = express.Router();
const upload = multer({ storage: storage });

router
  .route("/")
  .post(
    authmiddleware.isAuthenticated,
    authmiddleware.restricTo(Role.Admin),
    upload.single("image"),
    ProductController.addProduct
  );

export default router;
