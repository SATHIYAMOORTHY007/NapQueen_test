const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.token

  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res.sendStatus(401)
    } else {
      next()
    }
  })
}

module.exports = { verifyToken }
