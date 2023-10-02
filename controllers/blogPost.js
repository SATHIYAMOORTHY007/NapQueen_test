const express = require('express')
const blogPost = require('../models/blogPost')

const createPost = async (req, res) => {
  try {
    const { title, content, category_id } = req.body
    const blogpost = await blogPost.create({ title, content, category_id })
    blogpost.save()
    res.status(201).json({ message: blogpost })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

//get all post
const getallpost = async (req, res) => {
  try {
    const allPost = await blogPost.find()
    res.status(201).json({ message: allPost })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

//get particular post by id
const getParticularBlogPost = async (req, res) => {
  const id = req.params.id
  try {
    const blogpost = await blogPost.findById({ _id: id })

    if (!blogpost) return res.sendStatus(404)
    return res.json({ message: blogpost })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

//Update particular post
const updatePost = async (req, res) => {
  const id = req.params.id
  const { title, content } = req.body
  try {
    const blogpost = await blogPost.findByIdAndUpdate(id, { title, content })

    if (!blogpost) return res.sendStatus(404)
    return res.json({ message: blogpost })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

//delete
const deleteblogpost = async (req, res) => {
  const _id = req.params.id
  try {
    let deletePost = await blogPost.findByIdAndDelete(_id)
    return !deletePost ? res.sendStatus(404) : res.send(deletePost)
  } catch (error) {
    return res.json({ message: err.message })
  }
}

// GET /api/posts/latest: Retrieve the latest blog post from each unique category
const latest = async (req, res) => {
  try {
    const allPost = await blogPost.find()
    const latestPosts = []
    // Group items by category and find the latest update for each category
    const groupByCategory = allPost.reduce((group, product) => {
      const { category_id } = product
      group[category_id] = group[category_id] ?? []
      group[category_id].push(product)

      return group
    }, {})

    for (let key in groupByCategory) {
      groupByCategory[key].map((item, i) => {
        if (
          groupByCategory[key].length - 1 ==
          groupByCategory[key].indexOf(item)
        ) {
          latestPosts.push(item)
        }
      })
    }
    res.send({ latestPosts })
  } catch (err) {
    return res.send(err.message)
  }
}
module.exports = {
  latest,
  createPost,
  getallpost,
  getParticularBlogPost,
  updatePost,
  deleteblogpost,
}
