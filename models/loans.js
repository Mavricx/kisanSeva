const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agriculturalLoanSchema = new Schema({
    title: {
        type: String,
        required: true,
        intl: true
    },
    description: {
        type: String,
        required: true,
        intl: true
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
    image: {
        type: String,
        default:
            "https://images.jdmagicbox.com/comp/kolkata/a4/033pxx33.xx33.140523102731.c1a4/catalogue/state-bank-of-india-kankurgachi-kolkata-nationalised-banks-0l706rkhvp.jpg",
        set: (v) =>
            v === ""
                ? "https://images.jdmagicbox.com/comp/kolkata/a4/033pxx33.xx33.140523102731.c1a4/catalogue/state-bank-of-india-kankurgachi-kolkata-nationalised-banks-0l706rkhvp.jpg"
                : v,
    },
});

const AgriculturalLoan = mongoose.model('Loans', agriculturalLoanSchema);

module.exports = AgriculturalLoan;