if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: '../.env' })
}
const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT || 3000;


const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('../utils/ExpressError.js')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user.js');
const Schemes = require("../models/schemes.js");
const Loans = require("../models/loans.js");
const Items = require("../models/item.js");

app.set("views", path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '../public')));

async function main() {
    await mongoose.connect(dbUrl);
}
const MongoStore = require("connect-mongo");

// const sessionOptions = {
//     secret: "thisisnotagoodsecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//     }
// }

// app.use(
//     session({
//         secret: "thisisnotagoodsecret",
//         resave: false,
//         saveUninitialized: true,
//         store: MongoStore.create({
//             mongoUrl: process.env.MONGO_URL,
//             ttl: 14 * 24 * 60 * 60, // Session expiration in seconds
//         }),
//         cookie: {
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // Secure in production
//             sameSite: "lax",
//         },
//     })
// );
const sessionOptions = {
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbUrl }),
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: "lax",
    },
};
app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
});

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user); // Attach user object to req.user
//     } catch (err) {
//         done(err);
//     }
// });
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).lean();
        if (!user) return done(null, false);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

main().then(() => {
    console.log("database connection successful");
}).catch(err => console.log(err));

const itemRouter = require('../routes/item.js');
const userRouter = require('../routes/user.js');
const sellRouter = require('../routes/sell.js');
const loanRouter = require('../routes/loans.js');
const schemesRouter = require('../routes/schemes.js');
const reviewRouter = require('../routes/review.js');
const searchRouter = require("../routes/search.js")
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});

app.get("/", (req, res) => {
    res.render("listings/index.ejs")
})

app.get("/dashboard", (req, res) => {
    res.render("listings/dashboard.ejs")
})

app.use("/", userRouter)
app.use("/items", itemRouter);
app.use("/items/:id/reviews", reviewRouter)
app.use("/sells", sellRouter);
app.use("/sells/:id/reviews", reviewRouter)
app.use("/loans", loanRouter);
app.use("/schemes", schemesRouter);
app.use("/search", searchRouter)

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message);
})

app.listen(port, () => {
    console.log("server listening on port", port);
})