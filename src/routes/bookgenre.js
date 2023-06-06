const express = require("express");
const router = express.Router();
const { getBookGenre,
        editBookGenre,
        deleteBookGenre,
        addBookGenre } = require("../controllers/bookgenre.js");

// DESC     : GET ALL BOOKGENRES
// PATH     : /bookgenre
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getBookGenre);

// DESC     : EDIT BOOKGENRE
// PATH     : /bookgenre
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : -
router.put("/", editBookGenre);

// DESC     : DELETE BOOKGENRE
// PATH     : /bookgenre
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:bookid/:genreid", deleteBookGenre);

// DESC     : ADD BOOKGENRE
// PATH     : /bookgenre
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addBookGenre);

module.exports = router;