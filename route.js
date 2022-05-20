const router = require("express").Router();

const {
    getAllStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    createStudent
} = require('./controllers/student-controllers');

router.post('/create/student/new', createStudent);

router.get('/read/student/all', getAllStudent);

router.get('/read/student/', getStudent);

router.patch('/update/student', updateStudent);

router.delete('/delete/student', deleteStudent);

module.exports = { router };