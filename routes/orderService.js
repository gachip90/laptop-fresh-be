const express = require('express');
const { createOrderService, cancelOrderService, getOrderServiceById, getOrderServiceByUser, getAllOrderService, updateOrderService, deleteOrderService } = require('../controllers/orderServiceController');
const router = express.Router();

router.get('/get/:userId', getOrderServiceByUser);
router.get('/get/:id', getOrderServiceById);
router.get('/getAll', getAllOrderService);
router.post('/cancel/:id', cancelOrderService)
router.post('/create', createOrderService);
router.put('/update/:id', updateOrderService);
router.delete('/delete/:id', deleteOrderService)

module.exports = router;