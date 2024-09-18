    const express = require("express")
    const CustomersController = require("../../Controller/userController/Customers")
    const Invite = require("../../Controller/userController/invite")
    const Champion = require("../../Controller/championController")
    const ChampionItem = require("../../Controller/champsController")
    const DetailProfile = require("../../Controller/userController/detail")

    const router = express.Router()


    router.route("/user/customers/:id").get(CustomersController)

    router.route("/user/invite").post(Invite)

    router.route("/champion").get(Champion)

    router.route("/champs").post(ChampionItem)

    router.route("/detail/:id").get(DetailProfile)


    module.exports = router

