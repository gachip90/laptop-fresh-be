const Feedback = require('../models/Feedback');
const User = require('../models/User');

const createFeedback = async (req, res) => {
  const { userId, feedbackType, title, content } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User id là bắt buộc',
      });
    }

    const feedback = await Feedback.create({
      feedbackType,
      title,
      content,
      userId,
    });

    const user = await User.findByPk(userId);
    const userName = user ? user.fullName : null;

    res.status(200).json({
      success: true,
      message: "Tạo phản hồi mới thành công!",
      feedback,
      userName,
    });
  } catch (error) {
    console.error("Tạo phản hồi mới thất bại!", error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getFeedbackById = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) return res.status(400).json({ message: 'Phản hồi không tồn tại' });

    res.status(200).json({
      success: true,
      message: "Lấy thông tin phản hồi thành công!",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const getAllFeebacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [
        {
          model: User,
          attributes: ['fullName'],
        }
      ]
    });

    const feedbacksWithUser = feedbacks.map(fb => ({
      ...fb.toJSON(),
      userName: fb.User ? fb.User.fullName : null,
    }));

    res.status(200).json({
      success: true,
      message: "Lấy danh sách dịch vụ thành công!",
      feedbacks: feedbacksWithUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { feedbackType, title, content } = req.body;

  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) return res.status(400).json({ message: 'Phản hồi không tồn tại' });

    await feedback.update({
      feedbackType: feedbackType ?? feedback.feedbackType,
      title: title ?? feedback.title,
      content: content ?? feedback.content
    });

    res.status(200).json({
      success: true,
      message: "Cập nhật phản hồi thành công!",
      service,
    });
  } catch (error) {
    console.error("Cập nhật phản hồi thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

const deleteFeeback = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) return res.status(400).json({ message: 'Phản hồi không tồn tại' });

    await feedback.destroy();

    res.status(200).json({
      success: true,
      message: "Xóa phản hồi thành công!",
    });
  } catch (error) {
    console.error("Xóa phản hồi thất bại!");
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message,
    });
  }
};

module.exports = { createFeedback, getFeedbackById, getAllFeebacks, updateFeedback, deleteFeeback };