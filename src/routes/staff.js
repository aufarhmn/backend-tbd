const express = require("express");
const router = express.Router();
const { getStaff,
        editStaff,
        deleteStaff,
        addStaff } = require("../controllers/staff.js");

// DESC     : GET ALL STAFFS
// PATH     : /staff
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getStaff);

// DESC     : EDIT STAFF
// PATH     : /staff
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editStaff);

// DESC     : DELETE STAFF
// PATH     : /staff
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteStaff);

// DESC     : ADD STAFF
// PATH     : /staff
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addStaff);

module.exports = router;