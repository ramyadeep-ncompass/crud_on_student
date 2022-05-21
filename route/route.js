const router = require("express").Router();
const { authenticateStudent } = require('../auth/auth');

const {
    getAllStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    createStudent,
    login
} = require('../controllers/student-controllers');

router.get('/read/student/', getStudent);

router.post('/login', login);

router.use(authenticateStudent)

router.get('/read/student/all', getAllStudent);

router.post('/create/student/new', createStudent);

router.patch('/update/student', updateStudent);

router.delete('/delete/student', deleteStudent);

module.exports = { router };