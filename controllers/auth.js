const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const send = require('send')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { username, email_id, pwd } = req.body

    if (!email_id || !pwd)
      return res.status(400).json({ message: 'email or password required' })
    //duplicated email
    const duplicate = await User.findOne({ email: email_id }).exec()
    if (duplicate) return res.json({ message: 'already existing..' })

    const hashpwd = await bcrypt.hash(pwd, 10)
    const result = await User.create({
      username: username,
      email: email_id,
      password: hashpwd,
    })
    const token = jwt.sign({ id: User._id }, process.env.jwt)

    res.status(201).json({ message: `user created ` })
  } catch (err) {
    console.log(err)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email_id }).exec()

    if (!user) return res.status(404).json({ message: 'user not found' })

    const isPassword = await bcrypt.compare(req.body.pwd, user.password)

    if (!isPassword)
      return res.status(404).json({ message: 'password not match' })

    const token = jwt.sign({ id: user._id }, process.env.jwt)

    const { password, ...otherDetails } = user._doc
    return res
      .cookie('token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'success' })
  } catch (err) {
    return res.sendStatus(400)
  }
}

module.exports = {
  register,
  login,
}
