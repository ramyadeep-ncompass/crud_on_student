const Joi = require('joi');

const validateStudentId = (studentId) => {
    console.log((studentId));
    let validationResponse = {
        isValid: true,
        message: "",
    };

    const schema = Joi.object({
        id: Joi.string().length(4).required()
    });

    const validationResult = schema.validate(studentId);

    if (validationResult.error) {
        validationResponse.isValid = false;
        validationResponse.message = validationResult.error.details[0].message;
    }

    return validationResponse;
};

module.exports = { validateStudentId };