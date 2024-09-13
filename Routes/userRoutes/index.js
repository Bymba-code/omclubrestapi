const express = require("express")
const CustomersController = require("../../Controller/userController/Customers")


const router = express.Router()


router.route("/user/customers/:user_id").get(CustomersController)


module.exports = router

