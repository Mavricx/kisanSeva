const Item = require("../models/item.js");
const Loan = require("../models/loans.js");
const Schemes = require("../models/schemes.js");

module.exports.searchPost = async (req, res) => {
    let { voice } = req.body;
    res.redirect(`/search?voice=${voice}`);
}

module.exports.searchGet = async (req, res) => {
    try {
        const query = req.query.voice.toLowerCase().trim();
        if (!query) return res.status(400).json({ message: "Query is required!" });

        const results = await Item.find({
            $or: [
                { "title.en": { $regex: query, $options: "i" } },
                { "title.hi": { $regex: query, $options: "i" } },
                { "description.en": { $regex: query, $options: "i" } },
                { "description.hi": { $regex: query, $options: "i" } },
                { "productType.en": { $regex: query, $options: "i" } },
                { "productType.hi": { $regex: query, $options: "i" } },
            ],
        });

        const loanResult = await Loan.find({
            $or: [
                { "title.en": { $regex: query, $options: "i" } },
                { "title.hi": { $regex: query, $options: "i" } },
                { "description.en": { $regex: query, $options: "i" } },
                { "description.hi": { $regex: query, $options: "i" } },
            ],
        });

        const schemesResult = await Schemes.find({
            $or: [
                { "schemeName.en": { $regex: query, $options: "i" } },
                { "schemeName.hi": { $regex: query, $options: "i" } },
                { "description.en": { $regex: query, $options: "i" } },
                { "description.hi": { $regex: query, $options: "i" } },
            ],
        });

        res.render("listings/search_list.ejs", { results, loanResult, schemesResult, query });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Search failed" });
    }
}