const Blog  = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, description, image, author, category, publishedDate } = req.body;

  try {
    // Kiểm tra trùng lặp (ví dụ: title duy nhất)
    const existingBlog = await Blog.findOne({ where: { title } });
    if (existingBlog) return res.status(400).json({ message: "Bài blog đã tồn tại" });

    // Tạo bài blog mới
    const blog = await Blog.create({
      title,
      description,
      author,
      image,
      category,
      publishedDate,
    });

    res.status(200).json({
      success: true,
      message: "Tạo bài blog mới thành công!",
      blog,
    });
  } catch (error) {
    console.error("Tạo bài blog mới thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const getBlogBySlug = async (req, res) => {
  const { slug } = req.params
  try {
    const blog = await Blog.findOne({
      where: { slug },
    })

    if (!blog)
      return res.status(404).json({
        success: false,
        message: "Bài blog không tồn tại",
      })

    res.status(200).json({
      success: true,
      message: "Lấy thông tin bài blog thành công!",
      blog,
    })
  } catch (error) {
    console.error("Có lỗi xảy ra:", error)
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    })
  }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json({
      success: true,
      message: "Lấy danh sách bài blog thành công!",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, author, publishedDate  } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(400).json({ message: "Bài blog không tồn tại" });

    await blog.update({
      title: title ?? blog.title,
      description: description ?? blog.description,
      category: category ?? blog.category,
      author: author ?? blog.author,
      publishedDate: publishedDate ?? blog.publishedDate,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật bài blog thành công!",
      blog,
    });
  } catch (error) {
    console.error("Cập nhật bài blog thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(400).json({ message: "Bài blog không tồn tại" });

    await blog.destroy();

    res.status(200).json({
      success: true,
      message: "Xóa bài blog thành công!",
    });
  } catch (error) {
    console.error("Xóa bài blog thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports = { createBlog, getBlogBySlug, getAllBlogs, updateBlog, deleteBlog };