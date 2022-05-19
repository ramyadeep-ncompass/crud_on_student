const { mySqlConn } = require('../utilities/db');

module.exports.createStudent = (req, res) => {
    let student = req.params;
    var qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );'
    mySqlConn.query(
        qry, [student.id, student.name, student.dept, student.cgpa],
        (err, results, fields) => {
            res.send(results);
        }
    );
}