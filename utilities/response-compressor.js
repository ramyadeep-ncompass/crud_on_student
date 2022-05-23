var Buffer = require('buffer').Buffer;
var zlib = require('zlib');

const CompressResponse = (data) => {
    return new Promise((resolve, reject) => {
        let input = JSON.stringify(data);
        let compressed = zlib.gzip(input, (err, result) => {
            return resolve(result);
        })
    })
}
module.exports = { CompressResponse }