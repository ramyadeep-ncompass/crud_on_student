const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

function validateUser(student) {
    let validatedStudent = schema.validate(student);
    if (validatedStudent.error) {
        return validatedStudent.error.message
    }
    return true;
}

module.exports = { validateUser };