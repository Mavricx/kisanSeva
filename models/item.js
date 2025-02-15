const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
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
    image: {
        url: String,
        filename: String
    },
    location: {
        type: String,
        required: true,
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
        type: String,
        enum: ["crop", "vegetables", "fruits", "machinery", "seeds", "fertilizers",],
        required: true
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

    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
