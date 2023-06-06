const express = require("express");
const router = express.Router();
const { getCountry,
        editCountry,
        deleteCountry,
        addCountry } = require("../controllers/country.js");

// DESC     : GET ALL COUNTRIES
// PATH     : /country
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getCountry);

// DESC     : EDIT COUNTRY
// PATH     : /country
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editCountry);

// DESC     : DELETE COUNTRY
// PATH     : /country
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteCountry);

// DESC     : ADD COUNTRY
// PATH     : /country
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addCountry);

module.exports = router;