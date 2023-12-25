const express = require("express")
const {
  getAllUsers,
  register,
  login,
  Logout,
} = require("../controller/usersController")
const verifyToken = require("../middleware/verifyToken")
const refreshToken = require("../controller/refreshToken")

const router = express.Router()

router.get("/users", verifyToken, getAllUsers)
router.post("/users", register)
router.post("/login", login)
router.get("/token", refreshToken)
router.delete("/logout", Logout)

module.exports = router
