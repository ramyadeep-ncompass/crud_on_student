const router = require("express").Router();
const { getAllStudent } = require('./modules/readall')

router.get("/", getAllStudent);

module.exports = { router };