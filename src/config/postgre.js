const db = require("./db");

const connectPostgre = async () => {
    try {
        await db.raw("SELECT 1");
        console.log("Database connection successful!");
    } catch (err) {
        console.error("Error connecting to PostgreSQL:", err);
        throw err;
    }
};

module.exports = connectPostgre;
