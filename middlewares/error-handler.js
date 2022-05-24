const ApiError = require('../middlewares/custom-error');
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        console.log('Custom Error');
        res.status(err.code);
        res.send({
            success: false,
            message: err.message
        });
        return;
    } else {
        console.log('Error');
        res.status(500).send({
            success: false,
            message: 'Something went wrong'
        })
    }

}

module.exports = { errorHandler }