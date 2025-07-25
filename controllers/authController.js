const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
  const { email, password, confirmPassword, fullName, phone, studentId } = req.body;

  // Kiểm tra confirmPassword
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Mật khẩu và xác nhận mật khẩu không khớp' });
  }

  try {
    // Kiểm tra email đã tồn tại
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: 'Email đã tồn tại' });

    // Tạo user mới
    user = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      fullName,
      phone,
      studentId,
    });

    res.status(200).json({
      success: true,
      message: "Tạo tài khoản mới thành công!"
    });
  } catch (error) {
    console.error("Tạo tài khoản mới thất bại!")
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({
      success: false,
      message: 'Sai tên đăng nhập hoặc mật khẩu'
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      success: true,
      userInfo: {
        fullName: user.fullName,
        userId: user.id,
        email: user.email,
        role: user.role,
        phone: user.phone
      },
      message: "Đăng nhập thành công",
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Đặt lại mật khẩu',
      html: `Click <a href="http://yourfrontend.com/reset-password/${token}">here</a> to reset your password.`,
    });

    res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = { register, login, resetPassword };