const { mySqlConn } = require('../utilities/db');

const createStudent = (req, res) => {
    let student = req.params;
    var qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );'
    mySqlConn.query(
        qry, [student.id, student.name, student.dept, student.cgpa],
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(`${results.affectedRows} row added.`);
        }
    );
};

const updateStudent = (req, res) => {
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
};

const deleteStudent = (req, res) => {
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
};

const getStudent = (req, res) => {
    let qry = 'SELECT * FROM student WHERE id = ?;';
    mySqlConn.query(
        qry, [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(results);
        }
    );
};

const getAllStudent = (req, res) => {
    mySqlConn.query(
        'SELECT * FROM student;',
        function(err, results, fields) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(results);
        }
    );
};


module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent }