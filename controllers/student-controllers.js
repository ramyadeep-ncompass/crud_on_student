const { runQueryAsync } = require('../utilities/db');
const { CompressResponse } = require('../utilities/response-compressor');
const { signStudent } = require('../utilities/auth');
const { ApiError } = require('../middlewares/custom-error');

const createStudent = async(req, res, next) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let student = req.body;
    let qry = 'INSERT INTO student (id,name,department,cgpa) VALUES (? ,? ,? ,? );';
    let qryParams = [student.id, student.name, student.dept, student.cgpa];

    let dbResponse = await runQueryAsync(qry, qryParams);

    if (dbResponse.error) {
        res.status(500).send(await CompressResponse({
            success: false,
            message: dbResponse.error.message,
            data: dbResponse.error
        }));
    }
    res.status(200).send(await CompressResponse({
        success: true,
        message: `${dbResponse.result.affectedRows} row effected`,
        data: dbResponse.result
    }));


};

const updateStudent = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let student = req.body;
    let qry = 'UPDATE student SET name = ? , department = ?, cgpa = ? WHERE id = ?;';
    let qryParams = [student.name, student.dept, student.cgpa, student.id];

    let dbResponse = await runQueryAsync(qry, qryParams);

    if (dbResponse.error) {
        res.status(500).send(await CompressResponse({
            success: false,
            message: dbResponse.error.message,
            data: dbResponse.error
        }));
    }
    if (dbResponse.result.affectedRows === 0) {
        res.status(400).send(await CompressResponse({
            success: false,
            message: `Student with id ${qryParams[3]} Not Found!`,
        }));
    } else {
        res.status(200).send(await CompressResponse({
            success: true,
            message: `${dbResponse.result.affectedRows} row updated.`,
            data: dbResponse.result
        }));
    }

};

const deleteStudent = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');

    let qry = 'DELETE FROM student WHERE id = ?;';
    let qryParams = [req.query.id];

    let dbResponse = await runQueryAsync(qry, qryParams);

    if (dbResponse.error) {
        res.status(500).send(await CompressResponse({
            success: false,
            message: dbResponse.error.message,
            data: dbResponse.error
        }));
    }
    if (dbResponse.result.affectedRows === 0) {
        res.status(400).send(await CompressResponse({
            success: false,
            message: `Student with id ${qryParams} Not Found!`,
        }));


    } else {
        res.status(400).send(await CompressResponse({
            success: true,
            message: `${dbResponse.result.affectedRows} row deleted.`,
            data: dbResponse.result
        }));
    }


};

const getStudent = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    let qry = 'SELECT * FROM student WHERE id = ?;';
    let qryParams = [req.query.id];

    let dbResponse = await runQueryAsync(qry, qryParams);

    if (dbResponse.error) {
        res.status(500).send(await CompressResponse({
            success: false,
            message: dbResponse.error.message,
            data: dbResponse.error
        }));
        return
    }
    if (dbResponse.result.length == 0) {
        res.status(400).send(await CompressResponse({
            success: false,
            message: `Student with id ${qryParams} Not Found!`,
            data: dbResponse.result
        }));
    } else {
        res.status(200).send(await CompressResponse({
            success: true,
            message: `${result.result.length} Student found`,
            data: dbResponse.result,
        }));

    }


};

const getAllStudent = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    const qry = 'SELECT * FROM student';

    let dbResponse = await runQueryAsync(qry);
    if (dbResponse.error) {
        res.status(500).send(await CompressResponse({
            success: true,
            message: dbResponse.error.message,
            data: dbResponse.error
        }));
        return;
    } else {
        res.status(200).send(await CompressResponse({
            success: true,
            message: `${dbResponse.result.length} row fetched`,
            data: dbResponse.result
        }));
    }
};

const login = async(req, res) => {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    const user = req.query;
    const qry = "SELECT * FROM admin WHERE email = ? AND id = ?";
    const qryParams = [user.email, user.id];

    let dbResponse = await runQueryAsync(qry, qryParams);

    if (dbResponse.error) {
        res.send(await CompressResponse({
            success: false,
            message: dbResponse.error.message
        }));
        return
    }
    if (dbResponse.result.length === 0) {
        res.send(await CompressResponse({
            success: false,
            message: "Id Not found",
        }));
    } else {
        res.send(await CompressResponse({
            success: true,
            message: "Id found",
            data: {
                token: await signStudent({ id: req.query.id })
            }
        }))
    }
};

const test = async(req, res, next) => {
    let qry = "select * from student";
    let result = await runQueryAsync(qry);
    res.send(result);
}

module.exports = { getAllStudent, getStudent, deleteStudent, updateStudent, createStudent, login, test }