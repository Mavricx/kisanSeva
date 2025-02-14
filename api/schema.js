const Joi = require('joi');
module.exports.itemSchema = Joi.object({
    item: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        pricePerUnit: Joi.number().required().min(0),
        minOrder: Joi.number().required().min(0),
        image: Joi.string().allow(" ", null)
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})

module.exports.loanSchema = Joi.object({
    loan: Joi.object({
        loanAmount: Joi.number().required().min(0),
        description: Joi.number().required(),
        rateOfInterest: Joi.number().required().min(0),
        duration: Joi.number().required().min(0),
        loanType: Joi.string().required(),
        image: Joi.string().allow(" ", null)
    }).required()
})

module.exports.schemeSchema = Joi.object({
    scheme: Joi.object({
        schemeName: Joi.string().required(),
        description: Joi.string().required(),
        organization: Joi.string().required(),
        image: Joi.string().allow(" ", null)
    }).required()
})