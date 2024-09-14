const express = require("express")
const CustomersController = require("../../Controller/userController/Customers")
const Invite = require("../../Controller/userController/invite")


const router = express.Router()


router.route("/user/customers/:user_id").get(CustomersController)

router.route("/user/invite").post(Invite)


module.exports = router

