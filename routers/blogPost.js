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
router.post('/posts', createPost)
router.get('/posts', getallpost)
router.get('/posts/latest', latest)
router.get('/posts/:id', getParticularBlogPost)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deleteblogpost)

module.exports = router
