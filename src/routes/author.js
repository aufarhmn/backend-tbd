const express = require("express");
const router = express.Router();
const { getAuthor } = require("../controllers/author.js");

// DESC     : GET ALL AUTHORS
// PATH     : /authors
// METHOD   : GET
// BODY     : -
router.get("/", getAuthor);

module.exports = router;