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
        const orderProduct = await OrderProduct.findAll({
            where: { userId },
            include: ['user'],
        });

        if (!orderProduct) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng của người dùng này'
            });
        }

        res.status(200).json({
            success: true,
            message: "Lấy thông tin đơn hàng thành công!",
            orderProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message,
        });
    }
};

const updateOrderProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, customerName, email, phone, status, address, totalPrice } = req.body

    try {
        const order = await OrderProduct.findByPk(id);
        if (!order) return res.status(400).json({ message: 'Đơn hàng không tồn tại' });
        await order.update({
            productName: productName ?? order.productName,
            customerName: customerName ?? order.customerName,
            email: email ?? order.email,
            phone: phone ?? order.phone,
            address: address ?? order.address,
            totalPrice: totalPrice ?? order.totalPrice,
            status: status ?? order.status,
        });

        res.status(200).json({
            success: true,
            message: "Cập nhật đơn hàng thành công!",
            order,
        });
    } catch (error) {
        console.error("Cập nhật đơn hàng thất bại!");
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message,
        });
    }
};

module.exports = { createOrderProduct, updateOrderProduct, getAllOrderProduct, getOrderProductByUser };

