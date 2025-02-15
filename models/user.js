const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        enum: ["Farmer", "Seller", "Banker", "NGO"],
    },
    address: {
        type: String,
        require: true
    },

})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);