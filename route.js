const router = require("express").Router();

const {
    getAllStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    createStudent
} = require('./controllers/student-controllers');

router.get('/create/student/new/id/:id/name/:name/dept/:dept/cgpa/:cgpa', createStudent);

router.get('/read/student/all', getAllStudent);

router.get('/read/student/id/:id', getStudent);

router.get('/update/student/id/:id/name/:name/dept/:dept/cgpa/:cgpa', updateStudent);

router.get('/delete/student/id/:id', deleteStudent);

module.exports = { router };