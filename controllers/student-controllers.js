const config = require('config');

const { mySqlConn } = require('../utilities/db');
const { validateStudent } = require('../models/login-validator');
const { CompressResponse } = require('../utilities/response-compressor');
const { signStudent, signStudent2 } = require('../utilities/auth');

const createStudent = (req, res) => {
    let student = req.body;
    let qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    let qryParams = [student.id, student.name, student.dept, student.cgpa];
    mySqlConn.query(
        qry, qryParams,
        (err, results) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message,
                    data: results
                });
            }
            res.status(200).send({
                success: true,
                message: `${results.affectedRows} row effected`,
                data: results
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
                    data: results
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: `${results.affectedRows} row updated.`,
                    data: results
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
                    data: results
                });
            }
            if (results.affectedRows === 0) {
                res.status(400).send({
                    success: false,
                    message: `Student with id ${qryParams} Not Found!`,
                    data: results
                });

            } else {
                res.status(400).send({
                    success: true,
                    message: `${results.affectedRows} row deleted.`,
                    data: results
                });
            }

        }
    );

};

const getStudent = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let qry = 'SELECT * FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    mySqlConn.query(
        qry, qryParams,
        async(err, results) => {
            if (err) {
                res.status(500).send(await CompressResponse({
                    success: false,
                    message: err.message,
                    data: results
                }));
            }

            if (results.affectedRows === 0) {
                res.status(400).send(await CompressResponse({
                    success: false,
                    message: `Student with id ${qryParams} Not Found!`,
                    data: results,
                }));
            } else {
                let token = await signStudent2({
                    id: req.query.id
                }).then(async(token) => {
                    res.status(200).send(await CompressResponse({
                        success: true,
                        message: `${results.length} Student found`,
                        data: token,

                    }));
                });

            }

        }
    );

};

const getAllStudent = (req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    mySqlConn.query(
        'SELECT * FROM student;',
        async(err, results) => {
            if (err) {
                res.status(500).send(await CompressResponse({
                    success: true,
                    message: err.message,
                    data: results
                }));
            } else {
                res.status(200).send(await CompressResponse({
                    success: true,
                    message: `${results.length} row fetched`,
                    data: results
                }));
            }

        }
    );
};

const login = (req, res) => {
    const user = req.body;
    const qry = "SELECT * FROM admin WHERE email = ? AND id = ?";
    const qryParams = [req.query.email, req.query.id];
    mySqlConn.query(qry, qryParams, async(err, result) => {
        if (err) {
            res.send({
                success: false,
                message: err.message
            });
        } else {
            if (result.length > 0) {
                res.send({
                    success: true,
                    message: "Id found",
                    data: await signStudent2({
                        id: req.query.id
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: "Id Not found",
                })
            }
        }
    })
};

const test = (req, res, next) => {
    const err = new CustomError('This is a custom error');
    err.errCode = 401;
    next(err);
}

module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent, login, test }