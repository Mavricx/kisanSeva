const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const itemSchema = new Schema({
    title: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, trim: true, lowercase: true },
        or: { type: String, trim: true, lowercase: true }, // Added Odia field
    },
    description: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, trim: true, lowercase: true },
        or: { type: String, trim: true, lowercase: true }, // Added Odia field
    },
    image: {
        url: {
            type: String,
            default: "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=800",
            set: (v) => v === "" ? "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=800" : v,
        },
    },
    location: { type: String, required: true, trim: true },
    pricePerUnit: { type: Number, required: true },
    productQuantity: { type: String, required: true },
    productType: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, trim: true, lowercase: true },
        or: { type: String, trim: true, lowercase: true }, // Added Odia field
    },
    minOrder: { type: Number, required: true },
    contactDetail: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

itemSchema.index({
    "title.en": "text",
    "title.hi": "text",
    "title.or": "text", // Added Odia field
    "description.en": "text",
    "description.hi": "text",
    "description.or": "text", // Added Odia field
    "productType.en": "text",
    "productType.hi": "text",
    "productType.or": "text", // Added Odia field
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;