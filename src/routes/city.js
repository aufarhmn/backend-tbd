const express = require("express");
const router = express.Router();
const { getCity,
        editCity,
        deleteCity,
        addCity } = require("../controllers/city.js");

// DESC     : GET ALL CITIES
// PATH     : /city
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getCity);

// DESC     : EDIT CITY
// PATH     : /city
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editCity);

// DESC     : DELETE CITY
// PATH     : /city
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteCity);

// DESC     : ADD CITY
// PATH     : /city
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addCity);

module.exports = router;