const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subsidySchemeSchema = new Schema({
    scheme_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true
    },
    target_beneficiaries: {
        type: String,
        required: true
    },
    subsidy_percentage: {
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: true
    }
});

const SubsidyScheme = mongoose.model('Schemes', subsidySchemeSchema);

module.exports = SubsidyScheme;