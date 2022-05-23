const express = require('express');
var compression = require('compression')
const { router } = require('./route/route');

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));


App.use('/api', router);

App.listen(3000, () => {
    console.log('Connected to localhost:3000');
});