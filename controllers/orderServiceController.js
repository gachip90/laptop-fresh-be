const OrderService = require('../models/OrderService');

const createOrderService = async (req, res) => {
  const { userId, fullName, studentId, email, phone, serviceType, details, deviceInfo, date, time, location, note } = req.body;

  try {
    // Kiểm tra userId (bắt buộc vì khách hàng phải đăng nhập)
    if (!userId) return res.status(400).json({ message: 'userId là bắt buộc' });

    // Tạo đơn hàng mới
    const orderService = await OrderService.create({
      userId,
      fullName,
      studentId,
      email,
      phone,
      serviceType,
      details,
      deviceInfo,
      date,
      time,
      location,
      note,
    });

    res.status(200).json({
      success: true,
      message: "Tạo đơn hàng thành công!",
      orderService,
    });
  } catch (error) {
    console.error("Tạo đơn hàng thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getOrderServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderService = await OrderService.findByPk(id, {
      include: ['user'],
    });
    if (!orderService) return res.status(400).json({ message: 'Đơn hàng không tồn tại' });

    res.status(200).json({
      success: true,
      message: "Lấy thông tin đơn hàng thành công!",
      orderService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getOrderServiceByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orderService = await OrderService.findAll({
      where: { userId },
      include: ['user'],
    });

    if (!orderService) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng của người dùng này'
      });
    }

    res.status(200).json({
      success: true,
      message: "Lấy thông tin đơn hàng thành công!",
      orderService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getAllOrderService = async (req, res) => {
  try {
    const orderService = await OrderService.findAll({
      include: ['user'],
    });
    res.status(200).json({
      success: true,
      message: "Lấy danh sách đơn hàng thành công!",
      orderService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const updateOrderService = async (req, res) => {
  const { id } = req.params;
  const { serviceType, fullName, phone, date, location, status } = req.body;

  try {
    const orderService = await OrderService.findByPk(id);
    if (!orderService) return res.status(400).json({ message: 'Đơn hàng không tồn tại' });
    await orderService.update({
      serviceType: serviceType ?? order.serviceType,
      fullName: fullName ?? order.fullName,
      phone: phone ?? order.phone,
      date: date ?? order.date,
      location: location ?? order.location,
      status: status ?? order.status,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật đơn hàng thành công!",
      orderService,
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

const cancelOrderService = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const orderService = await OrderService.findByPk(id);
    if (!orderService) return res.status(400).json({ message: 'Đơn hàng không tồn tại' });

    await orderService.update({
      status: "canceled",
    });

    res.status(200).json({
      success: true,
      message: "Hủy đơn đặt lịch thành công!",
      orderService,
    });
  } catch (error) {
    console.error("Hủy đơn đặt lịch thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const deleteOrderService = async (req, res) => {
  const { id } = req.params;
  try {
    const orderService = await OrderService.findByPk(id);
    if (!orderService) return res.status(400).json({ message: 'Đơn hàng không tồn tại' });

    await orderService.destroy();

    res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công!",
    });
  } catch (error) {
    console.error("Xóa đơn hàng thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

module.exports = { createOrderService, cancelOrderService, getOrderServiceById, getOrderServiceByUser, getAllOrderService, updateOrderService, deleteOrderService };