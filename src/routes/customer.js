const express = require("express");
const router = express.Router();
const { getCustomer,
        editCustomer,
        deleteCustomer,
        addCustomer } = require("../controllers/customer.js");

// DESC     : GET ALL CUSTOMERS
// PATH     : /customer
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getCustomer);

// DESC     : EDIT CUSTOMER
// PATH     : /customer
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editCustomer);

// DESC     : DELETE CUSTOMER
// PATH     : /customer
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteCustomer);

// DESC     : ADD CUSTOMER
// PATH     : /customer
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addCustomer);

module.exports = router;