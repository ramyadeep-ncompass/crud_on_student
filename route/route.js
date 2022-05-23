const router = require("express").Router();
// const { authenticateStudent } = require('../auth/auth');
const { validateStudent, validateStudentId } = require('../middlewares/validate-student');
const { validateUser } = require('../middlewares/login-validator');

const {
    getAllStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    createStudent,
    login
} = require('../controllers/student-controllers');

router.get('/read/student/', validateStudentId, getStudent);

router.post('/login', validateUser, login);

// router.use(authenticateStudent)

router.get('/read/student/all', getAllStudent);

router.post('/create/student/new', validateStudent, createStudent);

router.patch('/update/student', validateStudent, updateStudent);

router.delete('/delete/student', validateStudentId, deleteStudent);

module.exports = { router };