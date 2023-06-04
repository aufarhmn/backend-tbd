const express = require("express");
const router = express.Router();
const {
    rawSQL,
    getAllTable,
    getTableContent,
} = require("../controllers/sqlbuilders.js");

// DESC     : GET ALL TABLE NAMES
// PATH     : /sqlbuilders/table
// METHOD   : GET
// BODY     : -
router.get("/table", getAllTable);

// DESC     : RAW SQL COMMANDS HANDLER
// PATH     : /sqlbuilders/raw
// METHOD   : POST
// BODY     : { "sql": "SELECT * FROM \"Book\"" }
router.post("/raw", rawSQL);

// DESC     : GET TABLE CONTENT
// PATH     : /sqlbuilders/table
// METHOD   : POST
// BODY     : { "tableName": "Book" }
router.post("/table", getTableContent);

module.exports = router;
