const Joi = require('joi');


const schema = Joi.object({
    id: Joi.string().length(4).required(),
    name: Joi.string().min(2).required(),
    dept: Joi.string().min(2).required(),
    cgpa: Joi.number().min(0).max(10).required()
});

function validateStudent(student) {

    let validatedStudent = schema.validate(student);

    if (validatedStudent.error) {
        return validatedStudent.error.message
    }

    return true;
}

module.exports = { validateStudent };