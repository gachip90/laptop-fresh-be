const Product = require("../models/Product");

const createProduct = async (req, res) => {
  let { productName, originalPrice, discount, image, category, isNew, isBestSeller } = req.body;
  let price;

  try {
    const existingProduct = await Product.findOne({ where: { productName } });
    if (existingProduct) return res.status(400).json({ message: "Sản phẩm đã tồn tại" });

    const oriPrice = parseInt(originalPrice, 10);
    let disc = parseInt(discount, 10);
    if (isNaN(disc)) disc = 0;
    if (isNaN(oriPrice)) return res.status(400).json({ message: "originalPrice không hợp lệ" });
    price = Math.round(oriPrice * (100 - disc) / 100);


    const product = await Product.create({
      productName,
      price,
      originalPrice: oriPrice,
      discount: disc,
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
  const { productName, originalPrice, discount, image, category, isNew, isBestSeller } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).json({ message: "Sản phẩm không tồn tại" });

    // Lấy giá trị mới hoặc giữ nguyên
    const oriPrice = originalPrice !== undefined ? parseInt(originalPrice, 10) : product.originalPrice;
    let disc = discount !== undefined ? parseInt(discount, 10) : product.discount;
    if (isNaN(disc)) disc = 0;
    if (isNaN(oriPrice)) return res.status(400).json({ message: "originalPrice không hợp lệ" });
    const newPrice = Math.round(oriPrice * (100 - disc) / 100);

    await product.update({
      productName: productName ?? product.productName,
      originalPrice: oriPrice,
      discount: disc,
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