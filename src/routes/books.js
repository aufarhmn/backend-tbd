const express = require("express");
const router = express.Router();
const { getBooks,
        editBook,
        deleteBook,
        insertBooks,
        editMultiple } = require("../controllers/book.js");

// DESC     : GET ALL BOOKS
// PATH     : /books
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getBooks);

// DESC     : EDIT BOOK
// PATH     : /books
// METHOD   : PUT
// BODY     : title, description, publicationYear, pages
// PARAMS   : id
router.put("/:id", editBook);

// DESC     : DELETE BOOK
// PATH     : /books
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteBook);

// DESC     : INSERT BOOKS
// PATH     : /books
// METHOD   : POST
// BODY     : title, description, publicationYear, pages
// PARAMS   : -
router.post("/", insertBooks);

// DESC     : EDIT MULTIPLE BOOKS
// PATH     : /books/edit-multiple
// METHOD   : POST
// BODY     : books
// PARAMS   : -
router.post("/edit-multiple", editMultiple);

module.exports = router;