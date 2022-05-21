const Joi = require('joi');

const validateUser = (user) => {
    let validationResponse = {
        isValid: true,
        message: "",
    };

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const validationResult = schema.validate(user);

    if (validationResult.error) {
        validationResponse.isValid = false;
        validationResponse.message = validationResult.error.details[0].message.replace('\"', '')
            .replace('\"', '');
    }

    return validationResponse;
};

module.exports = { validateUser };