const { mySqlConn } = require('../utilities/db');

module.exports.getAllStudent = (req, res) => {
    mySqlConn.query(
        'SELECT * FROM student;',
        function(err, results, fields) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(results);
        }
    );
}