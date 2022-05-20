const { mySqlConn } = require('../utilities/db');
// const { validateUser } = require('../models/login-validator');
const { validateStudent } = require('../models/student-validator');

const createStudent = (req, res) => {
    let student = req.body;
    let qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    let qryParams = [student.id, student.name, student.dept, student.cgpa];
    let status = validateStudent(student);
    if (status === true) {
        mySqlConn.query(
            qry, qryParams,
            (err, results, fields) => {
                if (err) {
                    console.log(student);
                    res.status(400).send({
                        status: 400,
                        Headers: req.Headers,
                        encoding: " ",
                        body: {
                            success: true,
                            message: err.message,
                            data: {}
                        }
                    });
                }
                res.status(200).send({
                    status: 200,
                    Headers: req.Headers,
                    encoding: " ",
                    body: {
                        success: true,
                        message: `${results.affectedRows} row effected`,
                        data: {}
                    }
                });
            }
        );
    } else {
        res.status(400).send({
            status: 400,
            Headers: req.Headers,
            encoding: " ",
            body: {
                success: false,
                message: status,
                data: {}
            }
        });
    }


};

const updateStudent = (req, res) => {
    let student = req.body;
    let qry = 'UPDATE student SET name = ? , department = ?, cgpa = ? WHERE id = ?;';
    let qryParams = [student.name, student.dept, student.cgpa, student.id];
    mySqlConn.query(
        qry, qryParams,
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({
                status: 200,
                Headers: req.Headers,
                encoding: " ",
                body: {
                    success: true,
                    message: `${results.affectedRows} row effected`,
                    data: {}
                }
            });
        }
    );
};

const deleteStudent = (req, res) => {
    let qry = 'DELETE FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    mySqlConn.query(
        qry, qryParams,
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({
                status: 200,
                Headers: req.Headers,
                encoding: " ",
                body: {
                    success: true,
                    message: `${results.affectedRows} row effected`,
                    data: {}
                }
            });
        }
    );
};

const getStudent = (req, res) => {
    let qry = 'SELECT * FROM student WHERE id = ?;';
    mySqlConn.query(
        qry, [req.query.id],
        (err, results, fields) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({
                status: 200,
                Headers: req.Headers,
                encoding: " ",
                body: {
                    success: true,
                    message: `${results.length} row fetched`,
                    data: results
                }
            });

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
            res.status(200).send({
                status: 200,
                Headers: req.Headers,
                encoding: " ",
                body: {
                    success: true,
                    message: `${results.length} row fetched`,
                    data: results
                }
            });
        }
    );
};



const login = (req, res) => {
    const user = req.body;
    const email = "ramyadeep@ncompass.in";
    const password = "abcd1234";
    let status = validateUser(user)
    if (status === true) {

        if (email == user.email && password == user.password) {
            res.status(200).send({
                status: 200,
                Headers: req.Headers,
                encoding: " ",
                body: {
                    success: true,
                    message: `Logged in successfully`,
                    data: {}
                }
            });
        } else {
            res.status(200).send({
                status: 200,
                Headers: req.Headers,
                encoding: " ",
                body: {
                    success: false,
                    message: `Email or password is incorrect.`,
                    data: {}
                }
            });
        }
    } else {
        res.status(400).send({
            status: 400,
            Headers: req.Headers,
            encoding: " ",
            body: {
                success: false,
                message: status,
                data: {}
            }
        });
    }



};

module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent, login }