const Service = require('../models/Service');

const createService = async (req, res) => {
  const { serviceName, description, price, time, location,  } = req.body;

  try {
    // Kiểm tra trùng lặp (ví dụ: serviceName duy nhất)
    const existingService = await Service.findOne({ where: { serviceName } });
    if (existingService) return res.status(400).json({ message: 'Dịch vụ đã tồn tại' });

    // Tạo dịch vụ mới
    const service = await Service.create({
      serviceName,
      description,
      price,
      time,
      location,
    });

    res.status(200).json({
      success: true,
      message: "Tạo dịch vụ mới thành công!",
      service,
    });
  } catch (error) {
    console.error("Tạo dịch vụ mới thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) return res.status(400).json({ message: 'Dịch vụ không tồn tại' });

    res.status(200).json({
      success: true,
      message: "Lấy thông tin dịch vụ thành công!",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({
      success: true,
      message: "Lấy danh sách dịch vụ thành công!",
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { serviceName, description, price, time, location} = req.body;

  try {
    const service = await Service.findByPk(id);
    if (!service) return res.status(400).json({ message: 'Dịch vụ không tồn tại' });

    await service.update({
      serviceName: serviceName ?? service.serviceName,
      description: description ?? service.description,
      price: price ?? service.price,
      time: time ?? service.time,
      location: location ?? service.location,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật dịch vụ thành công!",
      service,
    });
  } catch (error) {
    console.error("Cập nhật dịch vụ thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) return res.status(400).json({ message: 'Dịch vụ không tồn tại' });

    await service.destroy();

    res.status(200).json({
      success: true,
      message: "Xóa dịch vụ thành công!",
    });
  } catch (error) {
    console.error("Xóa dịch vụ thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

module.exports = { createService, getServiceById, getAllServices, updateService, deleteService };