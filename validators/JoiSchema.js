const Joi = require('joi');

function validation(data) {
    const todoSchema = Joi.object({
        name: Joi.string().required(),
        description: Joi.any().optional(),
        category: Joi.string().required(),
        done: Joi.boolean()
    })
    return todoSchema.validate(data)
}

module.exports = validation;
