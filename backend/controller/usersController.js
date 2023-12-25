const express = require("express")
const { User } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
    })
    res.json(users)
  } catch (error) {
    console.log(error)
  }
}

const register = async (req, res) => {
  const { name, email, password, confirm } = req.body

  if (password !== confirm)
    return res.status(400).json({ msg: "password and confirm doesnt match" })

  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(password, salt)

  try {
    await User.create({
      name,
      email,
      password: hashPassword,
    })
    res.status(200).json({
      msg: "register success",
    })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    })

    if (user.length === 0)
      return res.status(404).json({ msg: "user not found!" })
    const match = await bcrypt.compare(req.body.password, user[0].password)
    if (!match) return res.status(400).json({ msg: "wrong password!" })

    const { id, name, email } = user[0]
    const accessToken = jwt.sign(
      { id, name, email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "20s",
      }
    )
    const refreshtoken = jwt.sign(
      { id, name, email },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    )

    await User.update(
      { refreshToken: refreshtoken },
      {
        where: {
          id,
        },
      }
    )

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({ accessToken })
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    })
  }
}

const Logout = async (req, res) => {
  const refresh_token = req.cookies.refreshToken
  if (!refresh_token) return res.sendStatus(401)

  const user = await User.findAll({
    where: {
      refreshToken: refresh_token,
    },
  })
  if (!user[0]) return res.sendStatus(403)
  const id = user[0].id
  await User.update(
    { refreshToken: null },
    {
      where: {
        id,
      },
    }
  )
  res.clearCookie("refreshToken")
  return res.sendStatus(200)
}

module.exports = {
  getAllUsers,
  register,
  login,
  Logout,
}
