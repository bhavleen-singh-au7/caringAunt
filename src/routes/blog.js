const express = require('express');
const blog = require('../controllers/blog')

const router = express.Router();

/*
BLOG PUBLIC ROUTE - Required No Login
*/

router.get('/blogs', blog.blogs);
router.get('/track-your-period', blog.includeBlog1);
router.get('/amazing-facts', blog.includeBlog2);
router.get('/period-branch', blog.includeBlog3);
router.get('/includeBlog4', blog.includeBlog4);
router.get('/includeBlog5', blog.includeBlog5);
router.get('/includeBlog6', blog.includeBlog6);
router.get('/includeBlog7', blog.includeBlog7);
router.get('/includeBlog8', blog.includeBlog8);
router.get('/includeBlog9', blog.includeBlog9);

module.exports = router;