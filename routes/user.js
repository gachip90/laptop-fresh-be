const express = require('express');
const { getUserById, getAllUsers, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/get/:id', getUserById);
router.get('/getAll', getAllUsers);
router.post('/update/:id', updateUser);

module.exports = router;