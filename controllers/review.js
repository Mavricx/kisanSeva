const Review = require('../models/review.js');
const Item = require('../models/item.js');

module.exports.createReview = async (req, res) => {
    let item = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    item.reviews.push(newReview);
    await newReview.save();
    await item.save();
    console.log("new review saved")
    req.flash("success", "New Review Added!!")
    res.redirect(`/items/${item._id}`);

}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Item.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })//code to pull or delete that review from the array of review
    let review = await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!!")
    console.log("review deleted", review)
    res.redirect(`/items/${id}`);
}