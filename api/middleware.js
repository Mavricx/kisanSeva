const Item = require("../models/item.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { sellSchema, reviewSchema, loanSchema, schemeSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to do this task!!")
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let item = await Item.findById(id);

    if (!item) {
        req.flash("error", "Product you requested for does not exist");
        return res.redirect("/dashboard");
    }
    if (!item.owner._id || !item.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized to do this task");
        return res.redirect(`/items/${id}`);
    }
    next();
}

module.exports.validateSell = (req, res, next) => {
    let { error } = sellSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not authorized to delete this review!!");
        return res.redirect(`/listing/${id}`);
    }
    next()
}