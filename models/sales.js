const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    sellerName: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    itemName: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default:
            "https://images.unsplash.com/photo-1498408040764-ab6eb772a145?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) =>
            v === ""
                ? "https://images.unsplash.com/photo-1498408040764-ab6eb772a145?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : v,
    },
    region: {
        type: String,
        required: true
    },
    minOrder: {
        type: Number,
        required: true
    }
});

const Listing = mongoose.model("Sales", listingSchema);
module.exports = Listing;
