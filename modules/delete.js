const { mySqlConn } = require('../utilities/db');

module.exports.deleteStudent = (req, res) => {
    let qry = 'DELETE FROM student WHERE id = ?;';
    mySqlConn.query(
        qry, [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(`${results.affectedRows} rows deleted.`);
        }
    );
}