const express = require("express");
const router = express.Router();
const { getStore,
        editStore,
        deleteStore,
        addStore } = require("../controllers/store.js");

// DESC     : GET ALL STORES
// PATH     : /store
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getStore);

// DESC     : EDIT STORE
// PATH     : /store
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editStore);

// DESC     : DELETE STORE
// PATH     : /store
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteStore);

// DESC     : ADD STORE
// PATH     : /store
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addStore);

module.exports = router;