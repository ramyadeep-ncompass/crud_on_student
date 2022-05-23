const router = require("express").Router();

const { validateStudent, validateStudentId } = require('../middlewares/validate-student');
const { authenticateToken } = require('../utilities/verify');
const { errorHandler } = require('../middlewares/error-handler');

const {
    getAllStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    createStudent,
    login,
    test
} = require('../controllers/student-controllers');

router.post('/login', login);

// router.use(authenticateToken);

router.get('/read/student/', validateStudentId, getStudent);

router.get('/read/student/all', getAllStudent);

router.post('/create/student/new', validateStudent, createStudent);

router.patch('/update/student', validateStudent, updateStudent);

router.delete('/delete/student', validateStudentId, deleteStudent);

router.get('/test', test);

router.use(errorHandler);

module.exports = { router };