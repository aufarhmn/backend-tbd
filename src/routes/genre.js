const express = require("express");
const router = express.Router();
const { getGenre,
        editGenre,
        deleteGenre,
        addGenre } = require("../controllers/genre.js");

// DESC     : GET ALL GENRES
// PATH     : /genre
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getGenre);

// DESC     : EDIT GENRE
// PATH     : /genre
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editGenre);

// DESC     : DELETE GENRE
// PATH     : /genre
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteGenre);

// DESC     : ADD GENRE
// PATH     : /genre
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addGenre);

module.exports = router;