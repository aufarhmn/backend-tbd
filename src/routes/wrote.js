const express = require("express");
const router = express.Router();
const { getWrote,
        editWrote,
        deleteWrote,
        addWrote } = require("../controllers/wrote.js");

// DESC     : GET ALL AUTHORS
// PATH     : /wrote
// METHOD   : GET
// BODY     : -
router.get("/", getWrote);

// DESC     : EDIT WROTE
// PATH     : /wrote
// METHOD   : PUT
// BODY     : authorid, bookid
router.put("/", editWrote);

// DESC     : DELETE WROTE
// PATH     : /wrote
// METHOD   : DELETE
// PARAMS   : authorid, bookid
router.delete("/:bookid/:authorid", deleteWrote);

// DESC     : ADD WROTE
// PATH     : /wrote
// METHOD   : POST
// BODY     : authorid, bookid
router.post("/", addWrote);

module.exports = router;