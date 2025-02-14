const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({

    title: {
        type: String,
        required: true,
        intl: true,
    },
    description: {
        type: String,
        required: true,
        intl: true,
    },
    location: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        enum: ["crop", "vegetables", "fruits", "machinery", "seeds", "fertilizers",],
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    minOrder: {
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

    productQuantity: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
