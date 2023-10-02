const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('blogPost', postSchema)
