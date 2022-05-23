const config = require('config');

const { mySqlConn } = require('../utilities/db');
const { validateStudent } = require('../models/login-validator');

const createStudent = (req, res) => {
    let student = req.body;
    let qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    let qryParams = [student.id, student.name, student.dept, student.cgpa];
    mySqlConn.query(
        qry, qryParams,
        (err, results, fields) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message,
                });
            }
            res.status(200).send({
                success: true,
                message: `${results.affectedRows} row effected`,
            });
        }
    );


};

const updateStudent = (req, res) => {
    let student = req.body;
    let qry = 'UPDATE student SET name = ? , department = ?, cgpa = ? WHERE id = ?;';
    let qryParams = [student.name, student.dept, student.cgpa, student.id];
    mySqlConn.query(
        qry, qryParams,
        (err, results, fields) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message,
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: `${results.affectedRows} row updated.`,
                });
            }
        }
    );

};

const deleteStudent = (req, res) => {
    let qry = 'DELETE FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    mySqlConn.query(
        qry, qryParams,
        (err, results) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message,
                });
            }
            res.status(200).send({
                success: true,
                message: `${results.affectedRows} row deleted.`,
            });
        }
    );

};

const getStudent = (req, res) => {
    let qry = 'SELECT * FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    mySqlConn.query(
        qry, qryParams,
        (err, results) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message,
                });
            }
            res.status(200).send({
                success: true,
                message: `${results.length} row fetched`,
                data: results
            });

        }
    );

};

const getAllStudent = (req, res) => {
    mySqlConn.query(
        'SELECT * FROM student;',
        (err, results) => {
            if (err) {
                res.status(500).send({
                    success: true,
                    message: err.message,
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
        });
    }


};

module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent, login }