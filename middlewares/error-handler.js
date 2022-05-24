const { ApiError } = require('../middlewares/custom-error');
const errorHandler = (err, req, res, next) => {
    console.log(err instanceof ApiError);
    if (err instanceof ApiError) {
        res.status(err.code).send({
            success: false,
            message: err.message
        });
        return;
    } else {
        res.status(500).send({
            success: false,
            message: 'Something went wrong'
        })
    }

}

module.exports = { errorHandler }