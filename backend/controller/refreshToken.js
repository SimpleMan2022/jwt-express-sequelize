const { User } = require("../models")
const jwt = require("jsonwebtoken")

const refreshTokenJWT = async (req, res) => {
  const refresh_token = req.cookies.refreshToken
  if (!refresh_token) return res.sendStatus(401)

  const user = await User.findAll({
    where: {
      refreshToken: refresh_token,
    },
  })

  if (!user[0]) return res.sendStatus(403)

  jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403)
    const { id, name, email } = user[0]
    const accessToken = jwt.sign(
      { id, name, email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "20s",
      }
    )
    res.json({ accessToken })
  })
}

module.exports = refreshTokenJWT
