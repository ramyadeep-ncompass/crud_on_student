const express = require('express');
const { getAllStudent } = require('./modules/readall');
const { getStudent } = require('./modules/read');
const { createStudent } = require('./modules/create');
const { deleteStudent } = require('./modules/delete');
const { updateStudent } = require('./modules/update');

const App = express();
App.use(express.urlencoded(true));

App.get('/api/create/student/new/id/:id/name/:name/dept/:dept/cgpa/:cgpa', createStudent);

App.get('/api/read/student/all', getAllStudent);

App.get('/api/read/student/id/:id', getStudent);

App.get('/api/update/student/id/:id/name/:name/dept/:dept/cgpa/:cgpa', updateStudent);

App.get('/api/delete/student/id/:id', deleteStudent);



App.listen(3000, () => {
    console.log('Connected to localhost:3000');
});