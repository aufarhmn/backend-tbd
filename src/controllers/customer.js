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

exports.getCustomer = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Customer")
            .join("Address", "Customer.AddressID", "Address.AddressID")
            .join("Store", "Customer.StoreID", "Store.StoreID")
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

exports.editCustomer = async (req, res) => {
    const { id } = req.params;
    const { CustomerID, StoreID, AddressID, FirstName, LastName } = req.body;

    try {
        const updatedCount = await db("Customer")
            .where({
                CustomerID: id,
            })
            .update({
                CustomerID: CustomerID,
                StoreID: StoreID,
                AddressID: AddressID,
                FirstName: FirstName,
                LastName: LastName,
            });

        if (updatedCount > 0) {
            res.json({ message: "Customer updated successfully" });
        } else {
            res.status(404).json({ error: "Customer not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Customer")
            .where({
                CustomerID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Customer deleted successfully" });
        } else {
            res.status(404).json({ error: "Customer not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addCustomer = async (req, res) => {
    const { CustomerID, StoreID, AddressID, FirstName, LastName } = req.body;

    try {
        const result = await db("Customer")
            .insert({
                CustomerID: CustomerID,
                StoreID: StoreID,
                AddressID: AddressID,
                FirstName: FirstName,
                LastName: LastName,
            });

            if (result > 0) {
                res.json({ message: "Staff added successfully" });
            } else {
                res.status(404).json({ error: "Staff not found" });
            }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}