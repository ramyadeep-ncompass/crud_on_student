const config = require('config');

module.exports.authenticateStudent = (req, res, next) => {

    const auth = config.get('authentication');
    console.log('This is a middleware');

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token !== auth.api_token) {
            res.status(401).send({
                success: false,
                message: "You are not authorized",
                data: {}
            });
            return
        }
    } catch {
        res.status(400).send({
            success: false,
            message: "Token not found",
            data: {}
        });
        return
    }
    next();
}