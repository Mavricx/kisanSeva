const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
const itemController = require("../controllers/items.js")

router.route("/")
    .get(wrapAsync(itemController.allItems))//all listing route


router.route("/:id")
    .get(wrapAsync(itemController.showOneItem))  //show each listing route


module.exports = router;