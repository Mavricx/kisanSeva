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
        enum: ["farmer", "seller", "Banker", "ngo"],
    },
    address: {
        city: String,
        state: String,
        pin: Number,
    },
    sell_items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Sales",
        }
    ]

})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);