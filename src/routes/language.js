const express = require("express");
const router = express.Router();
const { getLanguage,
        editLanguage,
        deleteLanguage,
        addLanguage } = require("../controllers/language.js");

// DESC     : GET ALL LANGUAGES
// PATH     : /language
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getLanguage);

// DESC     : EDIT LANGUAGE
// PATH     : /language
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editLanguage);

// DESC     : DELETE LANGUAGE
// PATH     : /language
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteLanguage);

// DESC     : ADD LANGUAGE
// PATH     : /language
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addLanguage);

module.exports = router;