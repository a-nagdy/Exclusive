import express from "express";
import productController from "../../controllers/products/products.js";
import { uploadFields } from "../../middleware/imageSaver/imageSaving.js";
import validateRequiredFields from "../../middleware/validations/validateRequiredFields.js";

const router = express.Router();

router.get("/products", productController.getAllProducts);

router.get("/product/:id", productController.getProductById);

router.post(
  "/add-product",
  uploadFields,
  validateRequiredFields([
    "name",
    "description",
    "price",
    "category",
    "quantity",
  ]),
  productController.addProduct
);

router.put("/update-product/:id", productController.updateProduct);

router.delete("/delete-product/:id", productController.deleteProduct);

export default router;
