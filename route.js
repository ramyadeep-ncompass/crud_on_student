const router = require("express").Router();

const {
    getAllStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    createStudent
} = require('./controllers/student-controllers');

router.get('/create/student/new', createStudent);

router.get('/read/student/all', getAllStudent);

router.get('/read/student/', getStudent);

router.get('/update/student', updateStudent);

router.get('/delete/student', deleteStudent);

module.exports = { router };