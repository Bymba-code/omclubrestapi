const express = require("express")
const GetAllUsers = require("../../Controller/adminController/ALL_USERS")

const router = express.Router()

router.route("/admin/users").get(GetAllUsers)


module.exports = router
