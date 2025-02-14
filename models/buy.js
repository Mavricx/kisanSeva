const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
    sellerName: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    farmLocation: {
        city: { type: String, require: true },
        state: { type: String, require: true },
        pin: { type: Number, require: true }

    },
    productType: {
        type: String,
        enum: ["crop", "vegetables", "fruits", "machinery", "seeds", "fertilizers",],
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
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Farmer = mongoose.model('Buy', farmerSchema);

module.exports = Farmer;
