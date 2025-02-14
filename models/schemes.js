const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subsidySchemeSchema = new Schema({
    schemeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:
            "https://www.ambujafoundation.org/images/agri-mission-impact-img2.jpg",
        set: (v) =>
            v === ""
                ? "https://www.ambujafoundation.org/images/agri-mission-impact-img2.jpg"
                : v,
    },
});

const SubsidyScheme = mongoose.model('Schemes', subsidySchemeSchema);

module.exports = SubsidyScheme;