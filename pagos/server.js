const express = require("express")
const morgan = require("morgan")
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const cors = require('cors')
const app = express()


// server settings
app.set("port", process.env.PORT || 3000)

// middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())


// routes
// app.use(process.env.API_PATH, require("./routes/ingredient.route"))

module.exports = app