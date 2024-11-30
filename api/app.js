const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

// const Schemes = require("../models/schemes.js");
const Loans = require("../models/loans.js");
// const Buy = require("../models/buy.js");
const Sell = require("../models/sell.js");


require('dotenv').config({ path: '../.env' });
const dbUrl = process.env.MONGO_URL;
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
    res.send("hi there")
})
app.get("/allLoans", async (req, res) => {
    const loans = await Loans.find({});
    res.render("listings/loan_list.ejs", { loans });
});
app.listen(port, () => {
    console.log("server listening on port", port);
})