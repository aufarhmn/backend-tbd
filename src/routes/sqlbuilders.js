const { getUsers } = require('../controllers/sqlbuilders.js');
const express = require('express');
const router = express.Router();

router.post('/', getUsers);

module.exports = router;