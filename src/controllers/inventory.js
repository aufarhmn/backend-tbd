const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRE_HOST,
        user: process.env.POSTGRE_USER,
        password: process.env.POSTGRE_PASSWORD,
        database: process.env.POSTGRE_DB,
    },
});

exports.getInventory = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Inventory")
            .join("Book", "Inventory.BookID", "Book.BookID")
            .join("Store", "Inventory.StoreID", "Store.StoreID")
            .catch((error) => {
                throw error;
            });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error retrieving table content:", error);
        res.status(500).json({
            error: "An error occurred while retrieving table content.",
        });
    }
}

exports.editInventory = async (req, res) => {
    const { id } = req.params;
    const { BookID, StoreID, Quantity } = req.body;

    try {
        const updatedCount = await db("Inventory")
            .where({
                InventoryID: id,
            })
            .update({
                BookID: BookID,
                StoreID: StoreID,
                Quantity: Quantity,
            });

        if (updatedCount > 0) {
            res.json({ message: "Inventory updated successfully" });
        } else {
            res.status(404).json({ error: "Inventory not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteInventory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Inventory")
            .where({
                InventoryID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Inventory deleted successfully" });
        } else {
            res.status(404).json({ error: "Inventory not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addInventory = async (req, res) => {
    const { InventoryID, BookID, StoreID, Quantity } = req.body;

    try {
        const insertedCount = await db("Inventory")
            .insert({
                InventoryID: InventoryID,
                BookID: BookID,
                StoreID: StoreID,
                Quantity: Quantity,
            });

        res.status(200).json(insertedCount);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}