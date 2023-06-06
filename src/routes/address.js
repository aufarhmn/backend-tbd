const express = require("express");
const router = express.Router();
const { getAddress,
        editAddress,
        deleteAddress,
        addAddress } = require("../controllers/address.js");

// DESC     : GET ALL ADDRESSES
// PATH     : /address
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getAddress);

// DESC     : EDIT ADDRESS
// PATH     : /address
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editAddress);

// DESC     : DELETE ADDRESS
// PATH     : /address
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteAddress);

// DESC     : ADD ADDRESS
// PATH     : /address
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addAddress);

module.exports = router;