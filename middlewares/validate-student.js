const Joi = require('joi');

const validateStudent = (req, res, next) => {

    const schema = Joi.object({
        id: Joi.string().length(4).required(),
        name: Joi.string().min(2).required(),
        dept: Joi.string().min(2).required(),
        cgpa: Joi.number().min(0).max(10).required()
    });

    const status = schema.validate(req.body);
    if (status.error) {
        res.send({
            success: false,
            message: status.error.details[0].message.replace('\"', '')
                .replace('\"', '')
        })
        return;
    } else {
        next()
    }
}

const validateStudentId = (req, res, next) => {

    const schema = Joi.object({
        id: Joi.string().length(4).required()
    });

    const status = schema.validate(req.body);
    if (status.error) {
        res.send({
            success: false,
            message: status.error.details[0].message.replace('\"', '')
                .replace('\"', '')
        })
        return;
    } else {
        next()
    }
}

module.exports = { validateStudent, validateStudentId }