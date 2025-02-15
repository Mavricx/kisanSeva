const express = require("express");
const router = express.Router({ mergeParams: true })
const wrapAsync = require('../utils/wrapAsync.js')

const loanController = require("../controllers/loans.js");

router.get("/", wrapAsync(loanController.showAllLoans))//all listing route
router.get("/:id", wrapAsync(loanController.showOneLoan))  //show each listing route
module.exports = router;