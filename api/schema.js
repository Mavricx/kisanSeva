const Joi = require('joi');

module.exports.itemSchema = Joi.object({
    newSell: Joi.object({
        title: Joi.object({
            en: Joi.string().required(),
            hi: Joi.string().allow('')
        }).required(),
        description: Joi.object({
            en: Joi.string().required(),
            hi: Joi.string().allow('')
        }).required(),
        location: Joi.string().required(),
        pricePerUnit: Joi.number().required(),
        productQuantity: Joi.string().required(),
        productType: Joi.object({
            en: Joi.string().required(),
            hi: Joi.string().allow('')
        }).required(),
        minOrder: Joi.number().required(),
        contactDetail: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})

// module.exports.loanSchema = Joi.object({
//     loan: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.number().required(),
//         bankName: Joi.string().required(),
//         amount: Joi.number().required().min(0),
//         interestRate: Joi.number().required().min(0),
//         duration: Joi.number().required().min(0),
//         bankWebsite: Joi.string().required(),
//         image: Joi.string().allow(" ", null)
//     }).required()
// })

// module.exports.schemeSchema = Joi.object({
//     scheme: Joi.object({
//         schemeName: Joi.string().required(),
//         description: Joi.string().required(),
//         organization: Joi.string().required(),
//         contactInfo: Joi.string().required(),
//         image: Joi.string().allow(" ", null)
//     }).required()
// })