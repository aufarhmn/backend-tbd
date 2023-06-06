const express = require("express");
const router = express.Router();
const { getPurchase,
        editPurchase,
        deletePurchase,
        addPurchase } = require("../controllers/purchase.js");

// DESC     : GET ALL PURCHASES
// PATH     : /purchase
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getPurchase);

// DESC     : EDIT PURCHASE
// PATH     : /purchase
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editPurchase);

// DESC     : DELETE PURCHASE
// PATH     : /purchase
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deletePurchase);

// DESC     : ADD PURCHASE
// PATH     : /purchase
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addPurchase);

module.exports = router;