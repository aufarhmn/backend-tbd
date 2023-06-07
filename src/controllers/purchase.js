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

exports.getPurchase = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Purchase")
            .join("Customer", "Purchase.CustomerID", "Customer.CustomerID")
            .join("Staff", "Purchase.StaffID", "Staff.StaffID")
            .join("Store", "Purchase.StoreID", "Store.StoreID")
            .join("Inventory", "Purchase.InventoryID", "Inventory.InventoryID")
            .join("Book", "Inventory.InventoryID", "Book.BookID")
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

exports.editPurchase = async (req, res) => {
    const { id } = req.params;
    const { CustomerID, StaffID, StoreID, InventoryID, Amount, PurchaseDate } = req.body;

    try {
        const updatedCount = await db("Purchase")
            .where({
                PurchaseID: id,
            })
            .update({
                CustomerID: CustomerID,
                StaffID: StaffID,
                StoreID: StoreID,
                InventoryID: InventoryID,
                Amount: Amount,
                PurchaseDate: PurchaseDate,
            });

        if (updatedCount > 0) {
            res.json({ message: "Purchase updated successfully" });
        } else {
            res.status(404).json({ error: "Purchase not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deletePurchase = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Purchase")
            .where({
                PurchaseID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Purchase deleted successfully" });
        } else {
            res.status(404).json({ error: "Purchase not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addPurchase = async (req, res) => {
    const { PurchaseID, CustomerID, StaffID, StoreID, InventoryID, Amount, PurchaseDate } = req.body;

    try {
        const result = await db("Purchase")
            .insert({
                PurchaseID: PurchaseID,
                CustomerID: CustomerID,
                StaffID: StaffID,
                StoreID: StoreID,
                InventoryID: InventoryID,
                Amount: Amount,
                PurchaseDate: PurchaseDate,
            })

        res.status(200).json(result);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}