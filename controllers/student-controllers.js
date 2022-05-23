const { mySqlConn, runQuery } = require('../utilities/db');
const { CompressResponse } = require('../utilities/response-compressor');
const { signStudent } = require('../utilities/auth');
const { CustomError } = require('../middlewares/custom-error');

const createStudent = (req, res, next) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let student = req.body;
    let qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    let qryParams = [student.id, student.name, student.dept, student.cgpa];
    runQuery(
        qry, qryParams,
        async(err, results) => {
            if (err) {
                res.status(500).send(await CompressResponse({
                    success: false,
                    message: err.message,
                    data: results
                }));
            }
            res.status(200).send(await CompressResponse({
                success: true,
                message: `${results.affectedRows} row effected`,
                data: results
            }));
        }
    );


};

const updateStudent = (req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let student = req.body;
    let qry = 'UPDATE student SET name = ? , department = ?, cgpa = ? WHERE id = ?;';
    let qryParams = [student.name, student.dept, student.cgpa, student.id];
    runQuery(
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
                    message: `Student with id ${qryParams[3]} Not Found!`,
                }));
            } else {
                res.status(200).send(await CompressResponse({
                    success: true,
                    message: `${results.affectedRows} row updated.`,
                    data: results
                }));
            }
        }
    );

};

const deleteStudent = (req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let qry = 'DELETE FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    runQuery(
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
                }));


            } else {
                res.status(400).send(await CompressResponse({
                    success: true,
                    message: `${results.affectedRows} row deleted.`,
                    data: results
                }));
            }

        }
    );

};

const getStudent = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let qry = 'SELECT * FROM student WHERE id = ?;';
    let qryParams = [req.query.id];
    runQuery(
        qry, qryParams,
        async(err, results) => {
            if (err) {
                res.status(500).send(await CompressResponse({
                    success: false,
                    message: err.message,
                    data: results
                }));
            }
            if (results.length == 0) {
                res.status(400).send(await CompressResponse({
                    success: false,
                    message: `Student with id ${qryParams} Not Found!`,
                }));
            } else {
                res.status(200).send(await CompressResponse({
                    success: true,
                    message: `${results.length} Student found`,
                    data: results,
                }));

            }

        }
    );

};

const getAllStudent = (req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    const qry = 'SELECT * FROM student';
    runQuery(qry, async(err, results) => {
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
    });
};

const login = (req, res) => {
    const user = req.body;
    const qry = "SELECT * FROM admin WHERE email = ? AND id = ?";
    const qryParams = [req.query.email, req.query.id];
    runQuery(qry, qryParams, async(err, result) => {
        if (err) {
            res.send(await CompressResponse({
                success: false,
                message: err.message
            }));
        } else {
            if (result.length > 0) {
                res.send(await CompressResponse({
                    success: true,
                    message: "Id found",
                    data: {
                        token: await signStudent({ id: req.query.id })
                    }
                }))
            } else {
                res.send(CompressResponse({
                    success: false,
                    message: "Id Not found",
                }))
            }
        }
    })
};

const test = (req, res, next) => {
    const err = new CustomError('This is a custom error');
    err.errCode = 402;
    next(err);
}

module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent, login, test }