const express = require('express');
const { router } = require('./route');

const App = express();

App.use('/api', router);

App.use(express.json());

App.listen(3000, () => {
    console.log('Connected to localhost:3000');
});