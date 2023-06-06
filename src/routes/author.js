const express = require("express");
const router = express.Router();
const { getAuthor,
        editAuthor,
        deleteAuthor,
        addAuthor,
        editMultipleAuthors } = require("../controllers/author.js");

// DESC     : GET ALL AUTHORS
// PATH     : /authors
// METHOD   : GET
// BODY     : -
router.get("/", getAuthor);

// DESC     : EDIT AUTHOR
// PATH     : /authors
// METHOD   : PUT
// BODY     : FirstName, LastName, YearBorn, YearDied
// PARAMS   : id
router.put("/:id", editAuthor);

// DESC     : DELETE AUTHOR
// PATH     : /authors
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteAuthor);

// DESC     : ADD AUTHOR
// PATH     : /authors
// METHOD   : POST
// BODY     : FirstName, LastName, YearBorn, YearDied
// PARAMS   : -
router.post("/", addAuthor);

// DESC     : EDIT MULTIPLE AUTHORS
// PATH     : /authors
// METHOD   : PUT
// BODY     : FirstName, LastName, YearBorn, YearDied
// PARAMS   : -
router.post("/edit-multiple", editMultipleAuthors);

module.exports = router;