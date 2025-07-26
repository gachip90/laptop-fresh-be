const express = require('express');
const { createOrderProduct, updateOrderProduct, getAllOrderProduct, getOrderProductByUser } = require('../controllers/orderProductController');
const router = express.Router();

router.get('/get/:userId', getOrderProductByUser);
router.get('/getAll', getAllOrderProduct);
router.post('/create', createOrderProduct);
router.put('/update/:id', updateOrderProduct);

module.exports = router;