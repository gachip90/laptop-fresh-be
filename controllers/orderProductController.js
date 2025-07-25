const OrderProduct = require('../models/OrderProduct');

const createOrderProduct = async (req, res) => {
    const { productName, customerName, email, phone, address, totalPrice, userId } = req.body;

    try {
        const orderProduct = await OrderProduct.create({ productName, customerName, email, phone, address, totalPrice, userId });
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lấy danh sách đơn hàng thất bại!",
            error: error.message,
        });
    }
};

const getOrderProductByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const orderProducts = await OrderProduct.findAll({ where: { userId } });
        if (!orderProducts || orderProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng của người dùng này'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Lấy thông tin đơn hàng thành công!',
            orderProducts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message,
        });
    }
};

module.exports = { createOrderProduct, getAllOrderProduct, getOrderProductByUser };

