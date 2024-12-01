const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const Schemes = require("../models/schemes.js");
const Loans = require("../models/loans.js");
const Buys = require("../models/buy.js");
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
    res.render("listings/scheme_show.ejs", { listing });

})

app.get("/sells", async (req, res) => {
    const sells = await Sells.find({});
    res.render("listings/sell_list.ejs", { sells });
});
app.get("/sells/new", (req, res) => {
    res.render("listings/sell_new.ejs")

})
app.get("/sells/:id", async (req, res) => {
    let { id } = req.params;
    try {
        const listing = await Sells.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/sell_show.ejs", { listing });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/sells", async (req, res) => {
    try {
        const newListing = new Sells(req.body.listing);
        await newListing.save();
        res.redirect(`/sells`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/sells/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Sells.findById(id);
    res.render("listings/sell_edit.ejs", { listing });
})
app.put("/sells/:id", async (req, res) => {
    let { id } = req.params;
    await Sells.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/sells/${id}`)
})

app.delete("/sells/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Sells.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/sells");

})
app.get("/buys", async (req, res) => {
    const buys = await Buys.find({});
    res.render("listings/buy_list.ejs", { buys });
});
app.get("/buys/:id", async (req, res) => {
    let { id } = req.params;
    try {
        const listing = await Buys.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/buy_show.ejs", { listing });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log("server listening on port", port);
})