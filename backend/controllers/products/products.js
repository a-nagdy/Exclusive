import validateRequiredFields from "../../middleware/validations/validateRequiredFields.js";
import Product from "../../models/products/products.js";

const productController = {
  getAllProducts: async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;

    try {
      if (
        isNaN(page) ||
        page < 1 ||
        (typeof req.query.page === "string" &&
          req.query.page.trim().length > 0 &&
          isNaN(parseInt(req.query.page)))
      ) {
        return res
          .status(400)
          .json({ message: "Invalid page number needed to be a number" });
      }
      if (limit < 1 || page < 1) {
        return res
          .status(400)
          .json({ message: "Invalid limit or page number" });
      }

      const products = await Product.find().limit(limit).skip(skip);

      if (products.length < limit) {
        // This might be the last page, as fewer products than the limit were returned
        return res.status(200).json({
          message: "Last Page or fewer products than limit",
          products,
          lastPage: true,
        });
      }
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      return res.status(200).json({
        message: "Products Fetched Successfully ",
        products,
        productsLength: products.length,
        lastPage: false,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  addProduct: async (req, res) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
      photo: req.body.photo,
      shipping: req.body.shipping,
      stock: req.body.stock,
    });

    console.log(product);

    try {
      const userRequiredFields = [
        "email",
        "description",
        "price",
        "category",
        "quantity",
      ];

      validateRequiredFields(userRequiredFields)(req, res);

      if (
        !product.name ||
        !product.description ||
        !product.price ||
        !product.category ||
        !product.quantity
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      console.log("passed first if");

      const existingProduct = await Product.findOne({ name: product.name });
      if (existingProduct) {
        return res.status(409).json({ message: "Product already exists" });
      }
      const savedProduct = await product.save();

      if (!savedProduct) {
        return res.status(500).json({
          message: "Product could not be saved",
        });
      }
      console.log("passed third  if");

      res
        .status(201)
        .json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found", status: 404 });
      }

      return res.status(200).json({
        message: "Product fetched successfully",
        status: 200,
        product,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  },
  updateProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found", status: 404 });
      }

      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.quantity = req.body.quantity || product.quantity;
      product.photo = req.body.photo || product.photo;
      product.shipping = req.body.shipping || product.shipping;
      product.stock = req.body.stock || product.stock;

      const updatedProduct = await product.save();

      if (!updatedProduct) {
        return res.status(500).json({
          message: "Product could not be updated",
          status: 500,
        });
      }

      return res.status(200).json({
        message: "Product updated successfully",
        status: 200,
        product: updatedProduct,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: "Product not found", status: 404 });
      }

      const deletedProduct = await product.deleteOne();

      if (!deletedProduct) {
        return res.status(500).json({
          message: "Product could not be deleted",
          status: 500,
        });
      }

      return res.status(200).json({
        message: "Product deleted successfully",
        status: 200,
        product: deletedProduct,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: 500 });
    }
  },
};

export default productController;
