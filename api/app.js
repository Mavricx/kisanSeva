const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const Schemes = require("../models/schemes.js");
const Loans = require("../models/loans.js");
// const Buy = require("../models/buy.js");
const Sells = require("../models/sell.js");

require('dotenv').config({ path: '../.env' });
const dbUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '../public')));

async function main() {
    await mongoose.connect(dbUrl);
}

main().then(() => {
    console.log("database connection successful");
}).catch(err => console.log(err));

app.get("/", (req, res) => {
    res.render("listings/register.ejs")
})
app.get("/login", (req, res) => {
    res.render("listings/login.ejs")
})
app.get("/register", (req, res) => {
    res.render("listings/register.ejs")
})
app.get("/dashboard", (req, res) => {
    res.render("listings/dashboard.ejs")
})
app.get("/allLoans", async (req, res) => {
    const loans = await Loans.find({});
    res.render("listings/loan_list.ejs", { loans });
});
app.get("/allLoans/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Loans.findById(id);
    res.render("listings/loan_show.ejs", { listing });

})
app.get("/schemes", async (req, res) => {
    const schemes = await Schemes.find({});
    res.render("listings/scheme_list.ejs", { schemes });
});
app.get("/schemes/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Schemes.findById(id);
    res.render("listings/loan_show.ejs", { listing });

})

app.get("/sells", async (req, res) => {
    const sells = await Sells.find({});
    res.render("listings/sell_list.ejs", { sells });
});
app.get("/sells/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Sells.findById(id);
    res.render("listings/loan_show.ejs", { listing });

})

app.listen(port, () => {
    console.log("server listening on port", port);
})