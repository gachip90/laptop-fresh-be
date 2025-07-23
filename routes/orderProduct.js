const express = require('express');
const { createOrderProduct, getAllOrderProduct } = require('../controllers/orderProductController');
const router = express.Router();

router.post('/create', createOrderProduct);
router.get('/getAll', getAllOrderProduct);
module.exports = router;