const User = require('../models/user');

//for render signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("../views/user/signup.ejs");
}

//for signup
module.exports.signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome to KisanSeva")
            console.log(registeredUser);
            res.redirect("/dashboard")
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

//for render login form
module.exports.renderLoginForm = (req, res) => {
    res.render("../views/user/login.ejs")
}

//for login
module.exports.login = async (req, res) => {
    req.flash("success", "You are logged into Wanderlust.");
    redirectUrl = res.locals.redirectUrl || "/dashboard";
    res.redirect(redirectUrl);
}

//for logout
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!");
        res.redirect("/");
    })
}