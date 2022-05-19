const express = require('express');

const App = express();

App.get('/', (req, res) => {
    res.send('<h1>Hello from express</h1>')
})

App.get('/home', (req, res) => {
    res.send('<h1>Home page</h1>')
})


App.listen(3000, () => {
    console.log('Connected to localhost:3000');
});