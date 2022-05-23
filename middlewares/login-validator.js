const Joi = require('joi');

const validateUser = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        id: Joi.string().length(4).required()
    });

    const status = schema.validate(req.query);
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