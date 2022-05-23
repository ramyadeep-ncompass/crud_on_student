const errorHandler = (err, req, res, next) => {
    console.log('Error handler called');
    const statusCode = err.errCode ? err.errCode : 500;
    res.status(statusCode);
    res.send({
        success: false,
        message: err.message
    });
    return;
}

module.exports = { errorHandler }