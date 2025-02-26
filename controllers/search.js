const Item = require("../models/item.js");
const Loan = require("../models/loans.js");
const Schemes = require("../models/schemes.js");

module.exports.searchPost = async (req, res) => {
    let voice = req.body.voice;
    let lang = req.body.lang;

    res.redirect(`/search?voice=${voice}&lang=${lang}`);
}

const extractKeyword = (query, language) => {
    if (!query || typeof query !== "string") return null;

    const words = query.trim().split(/\s+/); // Split by spaces

    if (words.length == 1) {
        return words[0];
    }
    else if (language === "en-IN" || words.length <= 3) {
        return words.length > 0 ? words[words.length - 1] : null; // Last word
    } else if (language === "hi-IN") {
        if (words.length == 1) {
            return words[0];
        }
        else if (words.length == 2 || words.length == 3) {
            return words[1];
        }
        else {
            return words.length > 3 ? words[2] : null; // second word
        }

    }
    else if (language === "or-IN") {
        return words[1];
    }
    return null;
};


module.exports.searchGet = async (req, res) => {
    try {
        const { voice, lang } = req.query;

        if (!voice || !lang) {
            return res.status(400).json({ message: "Query (voice) and language are required!" });
        }

        const keyword = extractKeyword(voice, lang);

        if (!keyword) {
            return res.status(400).json({ message: "Could not extract a valid keyword!" });
        }

        // 🔄 Redirect if the keyword is "sell" or "बेचना"
        if (keyword.toLowerCase() === "sell" || keyword === "बेचना") {
            return res.redirect("/sells/new");
        }

        // 🌟 Perform search query using regex
        const results = await Item.find({
            $or: [
                { "title.en": { $regex: keyword, $options: "i" } },
                { "title.hi": { $regex: keyword, $options: "i" } },
                { "title.or": { $regex: keyword, $options: "i" } },
                { "description.en": { $regex: keyword, $options: "i" } },
                { "description.hi": { $regex: keyword, $options: "i" } },
                { "description.or": { $regex: keyword, $options: "i" } },
                { "productType.en": { $regex: keyword, $options: "i" } },
                { "productType.hi": { $regex: keyword, $options: "i" } },
                { "productType.or": { $regex: keyword, $options: "i" } },
            ],
        });


        const loanResult = await Loan.find({
            $or: [
                { "title.en": { $regex: voice, $options: "i" } },
                { "title.hi": { $regex: voice, $options: "i" } },
                { "title.or": { $regex: voice, $options: "i" } },
                { "description.en": { $regex: voice, $options: "i" } },
                { "description.hi": { $regex: voice, $options: "i" } },
                { "description.or": { $regex: voice, $options: "i" } },
            ],
        });

        const schemesResult = await Schemes.find({
            $or: [
                { "schemeName.en": { $regex: voice, $options: "i" } },
                { "schemeName.hi": { $regex: voice, $options: "i" } },
                { "schemeName.or": { $regex: voice, $options: "i" } },
                { "description.en": { $regex: voice, $options: "i" } },
                { "description.hi": { $regex: voice, $options: "i" } },
                { "description.or": { $regex: voice, $options: "i" } },
            ],
        });

        res.render("listings/search_list.ejs", { results, loanResult, schemesResult, voice });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Search failed" });
    }
}