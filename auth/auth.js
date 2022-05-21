module.exports.authenticateStudent = (req, res, next) => {
    console.log('This is a middleware');
    console.log((req.headers));
    next();
}