const express = require("express")
const GetAllUsers = require("../../Controller/adminController/ALL_USERS")
const Delete = require("../../Controller/adminController/DELETE")

const router = express.Router()

router.route("/admin/users").get(GetAllUsers)

router.route("/admin/delete/user").post(Delete)

module.exports = router
