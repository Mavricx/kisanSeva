const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subsidySchemeSchema = new Schema({
    schemeName: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, required: true, trim: true, lowercase: true },
    },
    description: {
        en: { type: String, required: true, trim: true, lowercase: true },
        hi: { type: String, required: true, trim: true, lowercase: true },
    },
    organization: { type: String, required: true },
    contactInfo: { type: String, required: true },
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

// 🔍 Create an index for multilingual search
subsidySchemeSchema.index({
    "schemeName.en": "text",
    "schemeName.hi": "text",
    "description.en": "text",
    "description.hi": "text",
});

const Schemes = mongoose.model("Schemes", subsidySchemeSchema);
module.exports = Schemes;
