const express = require("express")
const GetItems = require("../../Controller/customerController/GET_ALL")
const userItem = require("../../Controller/customerController/CUSTOMERS")
const Champion = require("../../Controller/championController")
    const Invite = require("../../Controller/userController/invite")





const router = express.Router()

router.route("/guard/:id").get(GetItems)

router.route("/customers/:id").get(userItem)

router.route("/champion").get(Champion)

    router.route("/user/invite").post(Invite)


module.exports = router
