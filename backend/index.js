const express = require("express")
const logRequest = require("./middleware/log")
const usersRouter = require("./routes/users")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
const port = 5000
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(logRequest)

app.use("/", usersRouter)

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`)
})
