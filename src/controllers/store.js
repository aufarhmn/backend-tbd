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

exports.getStore = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Store")
            .join("Address", "Store.AddressID", "Address.AddressID")
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

exports.editStore = async (req, res) => {
    const { id } = req.params;
    const { StoreName, YearBuilt, SizeOfBuilding } = req.body;

    try {
        const updatedCount = await db("Store")
            .where({
                StoreID: id,
            })
            .update({
                StoreName: StoreName,
                YearBuilt: YearBuilt,
                SizeOfBuilding: SizeOfBuilding,
            });

        if (updatedCount > 0) {
            res.json({ message: "Store updated successfully" });
        } else {
            res.status(404).json({ error: "Store not found" });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteStore = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Store")
            .where({
                StoreID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Store deleted successfully" });
        } else {
            res.status(404).json({ error: "Store not found" });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addStore = async (req, res) => {
    const { StoreID, AddressID, StoreName, YearBuilt, SizeOfBuilding } = req.body;

    try {
        const result = await db("Store")
            .insert({
                StoreID: StoreID,
                AddressID: AddressID,
                StoreName: StoreName,
                YearBuilt: YearBuilt,
                SizeOfBuilding: SizeOfBuilding,
            })
            .returning("*");

        if (result.length > 0) {
            res.json({ message: "Store added successfully" });
        } else {
            res.status(404).json({ error: "Store not found" });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}