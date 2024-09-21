const express = require("express")
const customerControllerGuard = require("../../Controller/guardController/allcustomersToday")
const oruulahController = require("../../Controller/guardController/oruulahController")
const asuudalContainer = require("../../Controller/guardController/asuudalContainer")
const updateToo = require("../../Controller/guardController/updateToo")

const router = express.Router()

router.route("/guard/customers").get(customerControllerGuard)

router.route("/guard/oruulah").post(oruulahController)

router.route("/guard/asuudal").post(asuudalContainer)

router.route("/guard/update").post(updateToo)

module.exports = router
