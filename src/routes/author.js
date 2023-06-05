const express = require("express");
const router = express.Router();
const { getAuthors } = require("../controllers/author.js");

// DESC     : GET ALL AUTHORS
// PATH     : /authors
// METHOD   : GET
// BODY     : -
router.get("/", getAuthors);

module.exports = router;