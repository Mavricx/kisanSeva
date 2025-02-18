const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js')
const searchController = require("../controllers/search.js")

router.route("/")
    .get(wrapAsync(searchController.searchGet))//all listing route
    .post(wrapAsync(searchController.searchPost))  //show each listing route


module.exports = router;