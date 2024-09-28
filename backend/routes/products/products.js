import express from 'express';
import productController from '../../controllers/products/products.js';

const router = express.Router();

router.get('/products', productController.getAllProducts);

router.get('/product/:id', productController.getProductById);

router.post('/add-product', productController.addProduct);

router.put('/update-product/:id', productController.updateProduct);

router.delete('/delete-product/:id', productController.deleteProduct);

export default router;