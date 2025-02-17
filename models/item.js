const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const itemSchema = new Schema({

    title: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, trim: true, lowercase: true },
    },
    description: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, trim: true, lowercase: true },
    },
    image: {
        url: String,
        filename: String
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },

    productQuantity: {
        type: String,
        required: true
    },
    productType: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, trim: true, lowercase: true },
    },

    minOrder: {
        type: Number,
        required: true
    },
    contactDetail: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

itemSchema.index({
    "title.en": "text",
    "title.hi": "text",
    "description.en": "text",
    "description.hi": "text",
    "productType.en": "text",
    "productType.hi": "text",
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
