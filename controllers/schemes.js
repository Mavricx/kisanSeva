const Schemes = require("../models/schemes.js");

module.exports.showAllSchemes = async (req, res) => {
    const schemes = await Schemes.find({});
    res.render("listings/schemes/scheme_list.ejs", { schemes });
}

module.exports.showOneScheme = async (req, res) => {
    let { id } = req.params;
    const scheme = await Schemes.findById(id);
    res.render("listings/schemes/scheme_show.ejs", { scheme });

}