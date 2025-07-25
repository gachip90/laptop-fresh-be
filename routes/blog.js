const express = require('express');
const router = express.Router();
const { createBlog, getBlogBySlug, getAllBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');

router.get('/getAll', getAllBlogs);
router.get('/get/:slug', getBlogBySlug);
router.post('/create', createBlog);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

module.exports = router;