const express = require('express');
const { createOrderProduct, getAllOrderProduct, getOrderProductByUser } = require('../controllers/orderProductController');
const router = express.Router();

router.post('/create', createOrderProduct);
router.get('/get/:userId', getOrderProductByUser);
router.get('/getAll', getAllOrderProduct);

module.exports = router;