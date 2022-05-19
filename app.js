const express = require('express');
const { getAllStudent } = require('./modules/readall');
const { createStudent } = require('./modules/create');

const App = express();
App.use(express.urlencoded());

App.get('/api/student/all', getAllStudent);
App.get('/api/student/new/id/:id/name/:name/dept/:dept/cgpa/:cgpa', createStudent);

App.listen(3000, () => {
    console.log('Connected to localhost:3000');
});