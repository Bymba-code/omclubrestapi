const express = require("express")
const GetAllUsers = require("../../Controller/adminController/ALL_USERS")
const Delete = require("../../Controller/adminController/DELETE")
const Customers = require("../../Controller/adminController/Customers")
const insertChamp = require("../../Controller/addChamp")
const tailan = require("../../Controller/adminController/tailan")
const {getDate }= require("../../Controller/dateController/index.js")

const router = express.Router()

router.route("/admin/users").get(GetAllUsers)

router.route("/admin/delete/user").post(Delete)

router.route("/admin/customers").get(Customers)

router.route("/admin/champs").post(insertChamp)

router.route("/admin/tailan").get(tailan)

router.route("/date").get(getDate)

module.exports = router
