const Loans = require("../models/loans.js");

module.exports.showAllLoans = async (req, res) => {
    const loans = await Loans.find({});
    res.render("listings/loans/loan_list.ejs", { loans });
}

module.exports.showOneLoan = async (req, res) => {
    let { id } = req.params;
    const loan = await Loans.findById(id);
    res.render("listings/loans/loan_show.ejs", { loan });

}