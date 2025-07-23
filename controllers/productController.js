const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const { productName, brand, price, originalPrice, discount, image, category, isNew, isBestSeller } = req.body;

  try {
    // Kiểm tra trùng lặp (ví dụ: productName duy nhất)
    const existingProduct = await Product.findOne({ where: { productName } });
    if (existingProduct) return res.status(400).json({ message: "Sản phẩm đã tồn tại" });

    // Tạo sản phẩm mới
    const product = await Product.create({
      productName,
      brand,
      price,
      originalPrice,
      discount,
      image,
      category,
      isNew,
      isBestSeller,
    });

    res.status(200).json({
      success: true,
      message: "Tạo sản phẩm mới thành công!",
      product,
    });
  } catch (error) {
    console.error("Tạo sản phẩm mới thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).json({ message: "Sản phẩm không tồn tại" });

    res.status(200).json({
      success: true,
      message: "Lấy thông tin sản phẩm thành công!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      success: true,
      message: "Lấy danh sách sản phẩm thành công!",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, brand, price, originalPrice, discount, image, category, isNew, isBestSeller } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).json({ message: "Sản phẩm không tồn tại" });

    await product.update({
      productName: productName ?? product.productName,
      brand: brand ?? product.brand,
      price: price ?? product.price,
      originalPrice: originalPrice ?? product.originalPrice,
      discount: discount ?? product.discount,
      image: image ?? product.image,
      category: category ?? product.category,
      isNew: isNew ?? product.isNew,
      isBestSeller: isBestSeller ?? product.isBestSeller,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công!",
      product,
    });
  } catch (error) {
    console.error("Cập nhật sản phẩm thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).json({ message: "Sản phẩm không tồn tại" });

    await product.destroy();

    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công!",
    });
  } catch (error) {
    console.error("Xóa sản phẩm thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports = { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct };