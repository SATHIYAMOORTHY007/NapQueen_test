const express = require('express')
const router = express.Router()

const {
  createPost,
  getallpost,
  getParticularBlogPost,
  updatePost,
  deleteblogpost,
  latest,
} = require('../controllers/blogPost')
const { verifyToken } = require('../utils/verifyToken')
router.post('/posts', verifyToken, createPost)
router.get('/posts', verifyToken, getallpost)
router.get('/posts/latest', verifyToken, latest)
router.get('/posts/:id', verifyToken, getParticularBlogPost)
router.put('/posts/:id', verifyToken, updatePost)
router.delete('/posts/:id', verifyToken, deleteblogpost)

module.exports = router
