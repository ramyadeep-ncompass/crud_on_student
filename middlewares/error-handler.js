const { CustomError } = require('../middlewares/custom-error');
const errorHandler = (err, req, res, next) => {
    const statusCode = err.errCode ? err.errCode : 500;
    console.log(err instanceof CustomError);
    res.status(statusCode);
    res.send({
        success: false,
        message: err.message
    });
    return;
}

module.exports = { errorHandler }