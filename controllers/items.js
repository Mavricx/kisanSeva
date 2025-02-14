const Item = require("../models/item.js");

module.export.allItems = async (req, res) => {
    const allItems = await Item.find({});
    res.render("listings/items/item_list.ejs", { allItems });
}

module.export.showOneItem = async (req, res) => {
    let { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).send("The product not found");
        }
        res.render("listings/items/item_show.ejs", { item });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}