const { mySqlConn } = require('../utilities/db');

module.exports.getAllStudent = (req, res) => {
    mySqlConn.query(
        'SELECT * FROM student;',
        function(err, results, fields) {
            res.send(results);
        }
    );
}