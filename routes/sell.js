const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
const { isLoggedIn, isOwner, validateSell } = require("../api/middleware.js")
const sellController = require("../controllers/sell.js")

const multer = require('multer');
const { storage } = require("../api/cloudConfig.js")
const upload = multer({ storage })

// Add this middleware before your routes
router.use(express.urlencoded({ extended: true }));

router.route("/")
    .get(isLoggedIn, wrapAsync(sellController.showAllSells))//all listing route
    .post(isLoggedIn, validateSell, wrapAsync(sellController.createSell))//post listing route

//add new listing route
router.get("/new", isLoggedIn, sellController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(sellController.showOneSell))  //show each listing route
    .put(isLoggedIn, isOwner, upload.single("sell[image]"), wrapAsync(sellController.updateOneSell)) //put / edit route
    .delete(isLoggedIn, isOwner, wrapAsync(sellController.destroySell)) //delete route


//get edit listing route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(sellController.renderEditForm))


module.exports = router;