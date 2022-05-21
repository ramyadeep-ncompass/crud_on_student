const Joi = require('joi');

const validateStudent = (student) => {
    let validationResponse = {
        isValid: true,
        message: "",
    };

    const schema = Joi.object({
        id: Joi.string().length(4).required(),
        name: Joi.string().min(2).required(),
        dept: Joi.string().min(2).required(),
        cgpa: Joi.number().min(0).max(10).required()
    });

    const validationResult = schema.validate(student);

    if (validationResult.error) {
        validationResponse.isValid = false;
        validationResponse.message = validationResult.error.details[0].message.replace('\"', '')
            .replace('\"', '');
    }

    return validationResponse;
};

module.exports = { validateStudent };