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

exports.getStaff = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Staff")
            .join("Address", "Staff.AddressID", "Address.AddressID")
            .join("Store", "Staff.StoreID", "Store.StoreID")
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

exports.editStaff = async (req, res) => {
    const { id } = req.params;
    const {  StoreID, AddressID, FirstName, LastName } = req.body;

    try {
        const updatedCount = await db("Staff")
            .where({
                StaffID: id,
            })
            .update({
                StoreID: StoreID,
                AddressID: AddressID,
                FirstName: FirstName,
                LastName: LastName,
            });

        if (updatedCount > 0) {
            res.json({ message: "Staff updated successfully" });
        } else {
            res.status(404).json({ error: "Staff not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Staff")
            .where({
                StaffID: id,
            })
            .del();
        
        res.status(200).json(deletedCount);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addStaff = async (req, res) => {
    const { StaffID, StoreID, AddressID, FirstName, LastName } = req.body;

    try {
        const insertedCount = await db("Staff")
            .insert({
                StaffID: StaffID,
                StoreID: StoreID,
                AddressID: AddressID,
                FirstName: FirstName,
                LastName: LastName,
            });

        res.status(200).json(insertedCount);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}