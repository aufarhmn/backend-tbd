const express = require("express");
const router = express.Router();
const { getPublisher,
        editPublisher,
        deletePublisher,
        addPublisher } = require("../controllers/publisher.js");

// DESC     : GET ALL PUBLISHERS
// PATH     : /publisher
// METHOD   : GET
// BODY     : -
// PARAMS   : -
router.get("/", getPublisher);

// DESC     : EDIT PUBLISHER
// PATH     : /publisher
// METHOD   : PUT
// BODY     : name, address
// PARAMS   : id
router.put("/:id", editPublisher);

// DESC     : DELETE PUBLISHER
// PATH     : /publisher
// METHOD   : DELETE
// BODY     : -
// PARAMS   : id
router.delete("/:id", deletePublisher);

// DESC     : ADD PUBLISHER
// PATH     : /publisher
// METHOD   : POST
// BODY     : name, address
// PARAMS   : -
router.post("/", addPublisher);

module.exports = router;