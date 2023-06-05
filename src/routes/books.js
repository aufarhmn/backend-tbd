const express = require("express");
const router = express.Router();
const { getBooks } = require("../controllers/book.js");

// DESC     : GET ALL BOOKS
// PATH     : /books
// METHOD   : GET
// BODY     : -
router.get("/", getBooks);

module.exports = router;