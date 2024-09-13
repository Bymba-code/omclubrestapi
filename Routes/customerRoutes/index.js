const express = require("express")
const GetItems = require("../../Controller/customerController/GET_ALL")


const router = express.Router()

router.route("/guard/:id").get(GetItems)

module.exports = router