
const Item = require("../models/item.js");

module.exports.showAllSells = async (req, res, next) => {
    try {
        if (req.user) {
            const allSells = await Item.find({ "owner": req.user._id });
            res.render("listings/sell/sell_list.ejs", { allSells });
        }
        else {
            req.flash("error", "Please Login to view your store.")
            res.redirect("/dashboard")
        }

    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load listings.");
        res.redirect("/sells");
    }
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/sell/sell_new.ejs");
};

module.exports.showOneSell = async (req, res, next) => {
    try {
        let { id } = req.params;
        const sell = await Item.findById(id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("owner");
        if (!sell) {
            req.flash("error", "Listing you requested for does not exist!!");
            return res.redirect("/sells");
        }
        res.render("listings/sell/sell_show.ejs", { sell });
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load the listing.");
        res.redirect("/sells");
    }
};

module.exports.renderEditForm = async (req, res, next) => {
    try {
        let { id } = req.params;
        const sell = await Item.findById(id);
        if (!sell) {
            req.flash("error", "Listing you requested for does not exist!!");
            return res.redirect("/sells");
        }
        let originalImageUrl = sell.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/c_scale,w_300");
        res.render("listings/sell/sell_edit.ejs", { sell, originalImageUrl });
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load the edit form.");
        res.redirect("/sells");
    }
};



module.exports.createSell = async (req, res, next) => {
    try {
        const newSell = new Item(req.body.newSell);
        newSell.owner = req.user._id;
        if (!newSell.image.url) {
            newSell.image.url = "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
        newSell.image.filename = "default.jpg";
        await newSell.save();
        req.flash("success", "New Listing Created!!");
        res.redirect("/sells");
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to create the listing.");
        res.redirect("/sells");
    }
};

module.exports.updateOneSell = async (req, res, next) => {
    try {
        let { id } = req.params;
        let sell = await Item.findByIdAndUpdate(id, { ...req.body.sell });
        if (req.file) {
            let url = req.file.path;
            let filename = req.file.filename;
            sell.image = { url, filename };
            await sell.save();
        }
        req.flash("success", "Listing Updated!!");
        res.redirect(`/sells/${id}`);
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to update the listing.");
        res.redirect("/sells");
    }
};

module.exports.destroySell = async (req, res, next) => {
    try {
        let { id } = req.params;
        let deletedSell = await Item.findByIdAndDelete(id);
        req.flash("success", "Listing Deleted!!");
        console.log(deletedSell);
        res.redirect("/sells");
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to delete the listing.");
        res.redirect("/sells");
    }
};
