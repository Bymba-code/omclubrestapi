const express = require("express")
const GetItems = require("../../Controller/customerController/GET_ALL")
const userItem = require("../../Controller/customerController/CUSTOMERS")
const Temtseen = require("../../Controller/userController/temtseen")


const router = express.Router()

router.route("/guard/:id").get(GetItems)

router.route("/customers/:id").get(userItem)

router.route("/customers/champion").get(Temtseen)
module.exports = router
