const express = require("express")
const GetItems = require("../../Controller/customerController/GET_ALL")
const userItem = require("../../Controller/customerController/CUSTOMERS")



const router = express.Router()

router.route("/guard/:id").get(GetItems)

router.route("/customers/:id").get(userItem)

module.exports = router
