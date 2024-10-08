const express = require("express");
const GetAllUsers = require("../../Controller/adminController/ALL_USERS");
const Delete = require("../../Controller/adminController/DELETE");
const Customers = require("../../Controller/adminController/Customers");
const insertChamp = require("../../Controller/addChamp");
const tailan = require("../../Controller/adminController/tailan");
const { getDate, insertDate, negtgelNeeh, negtgelHaah} = require("../../Controller/dateController/index.js");
const getDetail = require("../../Controller/adminController/DETAIL_USER");
const getDifference = require("../../Controller/statisticController");
const dataDashboard = require("../../Controller/adminController/statis");
const getStory = require("../../Controller/adminController/storyInvite");
const storyInvite = require("../../Controller/adminController/addStory");
const {startEvent, endEvent} = require("../../Controller/adminController/eventDay")

const router = express.Router();

router.route("/admin/users").get(GetAllUsers);
router.route("/admin/delete/user").post(Delete);
router.route("/admin/customers").get(Customers);
router.route("/admin/champs").post(insertChamp);
router.route("/admin/tailan").get(tailan);
router.route("/admin/date").get(getDate).post(insertDate);
router.route("/admin/user").post(getDetail);
router.route("/admin/stats").get(getDifference);
router.route("/admin/dashboard").get(dataDashboard);
router.route("/story").get(getStory).post(storyInvite);
router.route("/story/end").get(endEvent)
router.route("/story/start").get(startEvent)
router.route("/negtgelNeeh").get(negtgelNeeh)
router.route("/negtgelHaah").get(negtgelHaah)

module.exports = router; // Ensure this line ends with a semicolon
