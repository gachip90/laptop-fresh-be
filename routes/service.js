const express = require('express');
const { createService, getServiceById, getAllServices, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();

router.get('/get/:id', getServiceById);
router.get('/getAll', getAllServices);
router.post('/create', createService);
router.put('/update/:id', updateService);
router.delete('/delete/:id', deleteService)

module.exports = router;