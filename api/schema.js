const Joi = require('joi');

module.exports.sellSchema = Joi.object({
    newSell: Joi.object({
        title: Joi.object({
            en: Joi.string().required(),
            hi: Joi.string().allow('')
        }).required(),
        description: Joi.object({
            en: Joi.string().required(),
            hi: Joi.string().allow('')
        }).required(),
        image: Joi.object({
            url: Joi.string().allow('').required()
        }).required(),
        location: Joi.string().required(),
        pricePerUnit: Joi.number().required(),
        productQuantity: Joi.string().required(),
        productType: Joi.object({
            en: Joi.string().required(),
            hi: Joi.string().allow('')
        }).required(),
        minOrder: Joi.number().required(),
        contactDetail: Joi.string().required(),
        owner: Joi.string()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});