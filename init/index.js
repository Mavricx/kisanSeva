const mongoose = require("mongoose");
const initData = require("./data.js");
const Loans = require("../models/loans.js");
const Buy = require("../models/buy.js");
const Sell = require("../models/sell.js");
const Schemes = require("../models/schemes.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Loans.deleteMany({});
    await Loans.insertMany(initData.data);
    console.log("data was initialized");
};

const initDB2 = async () => {
    await Buy.deleteMany({});
    await Buy.insertMany(initData.data);
    console.log("data was initialized");
};

const initDB3 = async () => {
    await Sell.deleteMany({});
    await Sell.insertMany(initData.data);
    console.log("data was initialized");
};
const initDB4 = async () => {
    await Schemes.deleteMany({});
    await Schemes.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();
initDB2();
initDB3();
initDB4();
