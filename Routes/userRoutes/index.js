    const express = require("express")
    const CustomersController = require("../../Controller/userController/Customers")
    const Invite = require("../../Controller/userController/invite")
    const Champion = require("../../Controller/championController")
    const ChampionItem = require("../../Controller/champsController")

    const router = express.Router()


    router.route("/user/customers/:user_id").get(CustomersController)

    router.route("/user/invite").post(Invite)

    router.route("/champion").get(Champion)

    router.route("/champs").get(ChampionItem)


    module.exports = router

