const config = require('config');

const { mySqlConn } = require('../utilities/db');
const { validateUser } = require('../models/login-validator');
const { validateStudent } = require('../models/student-validator');
const { validateStudentId } = require('../models/student-id-validator');

const createStudent = (req, res) => {
    let student = req.body;
    let qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    let qryParams = [student.id, student.name, student.dept, student.cgpa];
    let status = validateStudent(student);
    if (status.isValid) {
        mySqlConn.query(
            qry, qryParams,
            (err, results, fields) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                        data: {}
                    });
                }
                res.status(200).send({
                    success: true,
                    message: `${results.affectedRows} row effected`,
                    data: {}
                });
            }
        );
    } else {
        res.status(400).send({
            success: false,
            message: status.message,
            data: {}
        });
    }


};

const updateStudent = (req, res) => {
    let student = req.body;
    let qry = 'UPDATE student SET name = ? , department = ?, cgpa = ? WHERE id = ?;';
    let qryParams = [student.name, student.dept, student.cgpa, student.id];
    let status = validateStudent(student);
    if (status.isValid) {
        mySqlConn.query(
            qry, qryParams,
            (err, results, fields) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                        data: {}
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        message: `${results.affectedRows} row updated.`,
                        data: {}
                    });
                }
            }
        );
    } else {
        res.status(400).send({
            success: false,
            message: status.message,
            data: {}
        });
    }

};

const deleteStudent = (req, res) => {
    let qry = 'DELETE FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    let status = validateStudentId(req.query);
    if (status.isValid) {
        mySqlConn.query(
            qry, qryParams,
            (err, results) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                        data: {}
                    });
                }
                res.status(200).send({
                    success: true,
                    message: `${results.affectedRows} row deleted.`,
                    data: {}
                });
            }
        );
    } else {
        res.status(400).send({
            success: false,
            message: status.message,
            data: {}
        });
    }

};

const getStudent = (req, res) => {
    let qry = 'SELECT * FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    let status = validateStudentId(req.query);
    if (status.isValid) {
        mySqlConn.query(
            qry, qryParams,
            (err, results) => {
                if (err) {
                    res.status(500).send({
                        success: false,
                        message: err.message,
                        data: {}
                    });
                }
                res.status(200).send({
                    success: true,
                    message: `${results.length} row fetched`,
                    data: results
                });

            }
        );
    } else {
        res.status(400).send({
            success: false,
            message: status.message,
            data: {}
        })
    }

};

const getAllStudent = (req, res) => {
    mySqlConn.query(
        'SELECT * FROM student;',
        (err, results) => {
            if (err) {
                res.status(500).send({
                    success: true,
                    message: err.message,
                    data: {}
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: `${results.length} row fetched`,
                    data: results
                });
            }

        }
    );
};

const login = (req, res) => {
    const user = req.body;
    const email = "ramyadeep@ncompass.in";
    const password = "abcd1234";
    let status = validateUser(user)
    if (status.isValid) {

        if (email == user.email && password == user.password) {
            res.status(200).send({
                success: true,
                message: `Logged in successfully`,
                data: {
                    token: config.get('authentication')
                }
            });
        } else {
            res.status(400).send({
                success: false,
                message: `Email or password is incorrect.`,
                data: {}
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: status.message,
            data: {}
        });
    }



};

module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent, login }