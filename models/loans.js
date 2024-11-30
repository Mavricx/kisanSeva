const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agriculturalLoanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    bankWebsite: {
        type: String,
        required: true
    },
    customerSupport: {
        type: String,
        required: true
    }
});

const AgriculturalLoan = mongoose.model('Loans', agriculturalLoanSchema);

module.exports = AgriculturalLoan;