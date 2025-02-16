const Item = require("../models/item.js");

module.exports.allItems = async (req, res) => {
    try {
        const allItems = await Item.find({ owner: { $ne: req.user._id } });
        res.render("listings/items/item_list.ejs", { allItems });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.showOneItem = async (req, res) => {
    let { id } = req.params;
    try {
        const item = await Item.findById(id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("owner");
        if (!item) {
            return res.status(404).send("The product not found");
        }
        res.render("listings/items/item_show.ejs", { item });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}