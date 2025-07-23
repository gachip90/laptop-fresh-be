const express = require('express');
const { createFeedback, getFeedbackById, getAllFeebacks, updateFeedback, deleteFeeback } = require('../controllers/feedbackController');
const router = express.Router();

router.get('/get/:id', getFeedbackById);
router.get('/getAll', getAllFeebacks);
router.post('/create', createFeedback);
router.put('/update/:id', updateFeedback);
router.delete('/delete/:id', deleteFeeback)

module.exports = router;