const { mySqlConn } = require('../utilities/db');

module.exports.getStudent = (req, res) => {
    let qry = 'SELECT * FROM student WHERE id = ?;';
    mySqlConn.query(
        qry, [req.params.id],
        (err, results, fields) => {
            res.send(results);
        }
    );
}