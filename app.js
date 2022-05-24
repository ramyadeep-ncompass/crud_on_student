const express = require('express');

const { router } = require('./route/route');
require('dotenv').config();

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));


App.use('/api', router);
const port = process.env.PORT;
App.listen(3000, () => {
    console.log(`Connected to localhost:3000`);
});