const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    sellerName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    farmLocation: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    pricePerKg: {
        type: Number,
        required: true
    },
    farmSize: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    certificationType: {
        type: String,
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
    primaryCrop: {
        type: String,
        required: true
    }
});

const Farmer = mongoose.model('Buy', farmerSchema);

module.exports = Farmer;
