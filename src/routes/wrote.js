const express = require("express");
const router = express.Router();
const { getWrote } = require("../controllers/wrote.js");

// DESC     : GET ALL AUTHORS
// PATH     : /authors
// METHOD   : GET
// BODY     : -
router.get("/", getWrote);

module.exports = router;