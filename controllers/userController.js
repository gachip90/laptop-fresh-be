const User = require('../models/User');

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(400).json({ message: "Người dùng không tồn tại" });

        res.status(200).json({
            success: true,
            message: "Lấy thông tin người dùng thành công!",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            success: true,
            message: "Lấy danh sách người dùng thành công!",
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, studentId, email, phone, className, major } = req.body

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(400).json({
            message: "Người dùng không tồn tại"
        });

        await user.update({
            fullName: fullName ?? user.fullName,
            studentId: studentId ?? user.studentId,
            email: email ?? user.email,
            phone: phone ?? user.phone,
            className: className ?? user.className,
            major: major ?? user.major,
        })

        res.status(200).json({
            success: true,
            message: "Cập nhật thông tin người dùng thành công!",
            user,
        });
    } catch (error) {
        console.error("Cập nhật thông tin người dùng thất bại!");
        res.status(500).json({
            success: false,
            message: "Lỗi server",
            error: error.message,
        })
    }
}

module.exports = { getUserById, getAllUsers, updateUser };