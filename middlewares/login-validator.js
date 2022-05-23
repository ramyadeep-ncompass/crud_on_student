const Joi = require('joi');

const validateUser = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
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
module.exports = { validateUser }