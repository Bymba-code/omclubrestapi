const express = require("express")
const loginController = require("../../Controller/authController/loginController/index")
const registerController = require("../../Controller/authController/registerController")

const router = express.Router()

router.route("/login").get(loginController)

router.route("/register").post(registerController)

module.exports = router
