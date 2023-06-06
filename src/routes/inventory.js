const express = require("express");
const router = express.Router();
const { getInventory,
        editInventory,
        deleteInventory,
        addInventory } = require("../controllers/inventory.js");

// DESC     : GET ALL INVENTORIES
// PATH     : /inventory
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getInventory);

// DESC     : EDIT INVENTORY
// PATH     : /inventory
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editInventory);

// DESC     : DELETE INVENTORY
// PATH     : /inventory
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deleteInventory);

// DESC     : ADD INVENTORY
// PATH     : /inventory
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addInventory);

module.exports = router;