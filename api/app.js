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

const sessionOptions = {
    secret: "thisisnotagoodsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user); // Attach user object to req.user
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
const wrapAsync = require('../utils/wrapAsync.js');
const Item = require("../models/item.js")
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

app.post("/search", wrapAsync(async (req, res) => {
    let { voice } = req.body;
    res.redirect(`/search?voice=${voice}`);
}));

app.get("/search", wrapAsync(async (req, res) => {
    try {
        const query = req.query.voice;
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

        res.render("listings/search_list.ejs", { results, query });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Search failed" });
    }
}))

app.use("/items", itemRouter);
app.use("/items/:id/reviews", reviewRouter)
app.use("/sells", sellRouter);
app.use("/sells/:id/reviews", reviewRouter)
app.use("/loans", loanRouter);
app.use("/schemes", schemesRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message);
})
//////////////////////////////////////////////



// app.get("/allLoans", );
// app.get("/allLoans/:id", )
// app.get("/schemes", );
// app.get("/schemes/:id",)

// app.get("/sells",);
// app.get("/sells/new", )
// app.get("/sells/:id",);
// app.post("/sells",);
// app.get("/sells/:id/edit", )
// app.put("/sells/:id", )

// app.delete("/sells/:id",)


// app.get("/buys", );
//app.get("/buys/:id", );

app.listen(port, () => {
    console.log("server listening on port", port);
})