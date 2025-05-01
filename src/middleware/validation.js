const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required().min(1),
    author: Joi.string().required().min(1),
    publishedDate: Joi.date().required(),
    rating: Joi.number().min(1).max(5).required()
});

const searchSchema = Joi.object({
    q: Joi.string().required()
}).unknown(true);

module.exports = {
    validateBook: (req, res, next) => {
        const { error } = bookSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    },
    validateSearch: (req, res, next) => {
        const { error } = searchSchema.validate(req.query);
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    }
};