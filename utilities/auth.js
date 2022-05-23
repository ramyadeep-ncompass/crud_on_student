var jwt = require('jsonwebtoken');

const signStudent = (data) => {
    return new Promise((resolve, reject) => {
        var token = jwt.sign(data, 'privateKey');
        resolve(token);
    })
}

const signStudent2 = (data) => {
    return new Promise((resolve) => {
        jwt.sign(data, 'privateKey', { expiresIn: '30m' }, (err, token) => {
            resolve(token);
        });
    })
}




module.exports = { signStudent, signStudent2 }