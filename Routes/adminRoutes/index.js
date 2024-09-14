const express = require("express")
const GetAllUsers = require("../../Controller/adminController/ALL_USERS")
const Delete = require("../../Controller/adminController/DELETE")
const Customers = require("../../Controller/adminController/Customers")

const router = express.Router()

router.route("/admin/users").get(GetAllUsers)

router.route("/admin/delete/user").post(Delete)

router.route("/admin/customers").get(Customers)

module.exports = router
