const express = require('express');
const { router } = require('./route');

const App = express();

App.use(express.json());

App.use('/api', router);

App.listen(3000, () => {
    console.log('Connected to localhost:3000');
});