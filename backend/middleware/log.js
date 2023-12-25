const logRequest = (req, res, next) => {
  console.log(`terjadi request pada path : ${req.path}`)
  next()
}

module.exports = logRequest
