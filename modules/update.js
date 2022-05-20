const { mySqlConn } = require('../utilities/db');

module.exports.updateStudent = (req, res) => {
    let student = req.params;
    var qry = 'UPDATE student SET name = ? , department = ?, cgpa = ? WHERE id = ?;'
    mySqlConn.query(
        qry, [student.name, student.dept, student.cgpa, student.id],
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(`${results.affectedRows} row effected!`);
        }
    );
}