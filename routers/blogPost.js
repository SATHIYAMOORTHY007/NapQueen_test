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
router.post('/posts', createPost)
router.get('/posts', getallpost)
router.get('/posts/latest', verifyToken, latest)
router.get('/posts/:id', getParticularBlogPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deleteblogpost)

module.exports = router
