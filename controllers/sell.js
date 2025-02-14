const Item = require("../models/item.js");

module.exports.showAllSells = async (req, res, next) => { //get to all listings
    const allSells = await Item.find({});
    res.render("listings/sell/sell_list.ejs", { allSells });
}


module.exports.renderNewForm = (req, res) => { //get to new form
    res.render("listings/sell/sell_new.ejs")
}


module.exports.showOneSell = async (req, res, next) => { //get to individual listing
    let { id } = req.params;
    const sell = await Item.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    if (!sell) {
        req.flash("error", "Listing you requested for does not exist!!");
        return res.redirect("/sells");
    }
    res.render("listings/sell/sell_show.ejs", { sell });
}


module.exports.renderEditForm = async (req, res, next) => { //get to edit form
    let { id } = req.params;
    const sell = await Item.findById(id);
    if (!sell) {
        req.flash("error", "Listing you requested for does not exist!!");
        res.redirect("/sells");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/c_scale,w_300");
    res.render("listings/sell/sell_edit.ejs", { listing, originalImageUrl });
}


module.exports.createSell = async (req, res, next) => { //post request
    // let { title, description, price, image, location, country } = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    const newSell = new Item(req.body.listing);
    newSell.owner = req.user._id;
    newSell.image = { url, filename }
    await newSell.save("listing saved successfully")
    req.flash("success", "New Listing Created!!")
    res.redirect("/sells");
}


module.exports.updateOneSell = async (req, res, next) => {
    let { id } = req.params;
    let sell = await Item.findByIdAndUpdate(id, { ...req.body.listing });
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        sell.image = { url, filename };
        await sell.save()
    }
    req.flash("success", "Listing Updated !!")
    res.redirect(`/sells/${id}`)
}

module.exports.destroySell = async (req, res, next) => {
    let { id } = req.params;
    let deletedSell = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !!")
    console.log(deletedSell);
    res.redirect("/sales");
}