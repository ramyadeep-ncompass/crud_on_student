const { mySqlConn } = require('../utilities/db');

module.exports.deleteStudent = (req, res) => {
    let qry = 'DELETE FROM student WHERE id = ?;';
    mySqlConn.query(
        qry, [req.params.id],
        (err, results, fields) => {
            res.send(`${results.affectedRows} rows deleted.`);
        }
    );
}