const express = require("express");
const router = express.Router({ mergeParams: true })
const wrapAsync = require('../utils/wrapAsync.js')

const schemeController = require("../controllers/schemes.js");

router.get("/", wrapAsync(schemeController.showAllSchemes))//all listing route
router.get("/:id", wrapAsync(schemeController.showOneScheme))  //show each listing route
module.exports = router;