const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.JWT_KEY;

module.exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.status(400).send({
            success: false,
            message: 'Authorization token is not found!'
        });
        return;
    }
    jwt.verify(token, privateKey, (err, userData) => {
        if (err) return res.status(403).send({
            success: false,
            message: 'You dont have the privilege.'
        });
        req.user = userData.user;
        next();
    })
}


// const verify2 = (token) => {
//     return new Promise((resolve) => {
//         resolve(token);
//     })
// }

// module.exports = { verify2 }