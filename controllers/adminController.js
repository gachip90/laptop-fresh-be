const User = require('../models/User');
const Service = require('../models/Service');
const OrderService = require('../models/OrderService');
const OrderProduct = require('../models/OrderProduct');

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: 'user' } });

    const activeServices = await Service.count();

    const totalRevenue = await OrderProduct.sum('totalPrice');

    const totalBookings = await OrderService.count();

    res.status(200).json({
      success: true,
      message: "Lấy thống kê thành công!",
      stats: {
        totalUsers,
        totalBookings,
        totalRevenue,
        activeServices
      }
    });

  } catch (error) {
    console.error("Lấy thống kê thất bại!", error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};


module.exports = {
  getStats
};