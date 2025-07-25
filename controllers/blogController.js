const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, description, author, image, category, content, publishedDate, } = req.body;

  try {
    // Kiểm tra trùng lặp (ví dụ: title duy nhất)
    const existingBlog = await Blog.findOne({ where: { title } });
    if (existingBlog) return res.status(400).json({ message: "Bài blog đã tồn tại" });

    // Lưu base64 trực tiếp vào DB
    const blog = await Blog.create({
      title,
      description,
      author,
      image,
      category,
      content,
      publishedDate,
    });

    res.status(200).json({
      success: true,
      message: "Tạo bài viếtviết mới thành công!",
      blog,
    });
  } catch (error) {
    console.error("Tạo bài viết mới thất bại!");
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
        message: "Bài viếtviết không tồn tại",
      })

    res.status(200).json({
      success: true,
      message: "Lấy thông tin bài viết thành công!",
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
      message: "Lấy danh sách bài viết thành công!",
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
  const { title, description, category, author, publishedDate, image, content } = req.body;

  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(400).json({ message: "Bài viết không tồn tại" });

    await blog.update({
      title: title ?? blog.title,
      description: description ?? blog.description,
      category: category ?? blog.category,
      author: author ?? blog.author,
      publishedDate: publishedDate ?? blog.publishedDate,
      image: image ?? blog.image,
      content: content ?? blog.content,
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật bài viếtviết thành công!",
      blog,
    });
  } catch (error) {
    console.error("Cập nhật bài viết thất bại!");
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
    if (!blog) return res.status(400).json({ message: "Bài viếtviết không tồn tại" });

    await blog.destroy();

    res.status(200).json({
      success: true,
      message: "Xóa bài viết thành công!",
    });
  } catch (error) {
    console.error("Xóa bài viết thất bại!");
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

module.exports = { createBlog, getBlogBySlug, getAllBlogs, updateBlog, deleteBlog };