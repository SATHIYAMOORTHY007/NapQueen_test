const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./db/mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4001
const blogPosts = require('./routers/blogPost')
const authRouter = require('./routers/auth')
app.use(bodyParser.json())
//POST /api/posts: Create a new blog post. The request body should contain title, content, and category_id.

app.use('/api/auth', authRouter)
app.use('/api', blogPosts)

app.listen(port, () => {
  connectDB()
})
