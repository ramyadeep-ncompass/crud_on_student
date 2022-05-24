const express = require('express');

const { router } = require('./route/route');
require('dotenv').config();

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: "Server is Active"
    })
})

App.use('/api', router);
const port = process.env.SERVER_PORT;
App.listen(port, () => {
    console.log(`Connected to localhost:${port}`);
});