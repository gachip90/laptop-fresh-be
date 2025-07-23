const OrderProduct = require('../models/OrderProduct');

const createOrderProduct = async (req, res) => {
    const { productName, customerName, email, phone, address, totalPrice } = req.body;

    try {
        const orderProduct = await OrderProduct.create({ productName, customerName, email, phone, address, totalPrice });
        res.status(200).json({
            success: true,
            message: "Tạo đơn hàng thành công!",
            orderProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Tạo đơn hàng thất bại!",
            error: error.message,
        });
    }
};   

const getAllOrderProduct = async (req, res) => {
    try {
        const orderProducts = await OrderProduct.findAll();

        res.status(200).json({
            success: true,
            message: "Lấy danh sách đơn hàng thành công!",
            orderProducts,  
        });
    }  catch (error) {
        res.status(500).json({
            success: false,
            message: "Lấy danh sách đơn hàng thất bại!",
            error: error.message,
        });
    }
};

module.exports = { createOrderProduct, getAllOrderProduct };

