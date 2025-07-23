const express = require('express');
const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/get/:id', getProductById);
router.get('/getAll', getAllProducts);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct)

module.exports = router;