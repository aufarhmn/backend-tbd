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

exports.getCountry = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Country")
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

exports.editCountry = async (req, res) => {
    const { id } = req.params;
    const { CountryName } = req.body;

    try {
        const updatedCount = await db("Country")
            .where({
                CountryID: id,
            })
            .update({
                CountryID: id,
                CountryName: CountryName,
            });

        if (updatedCount > 0) {
            res.json({ message: "Country updated successfully" });
        } else {
            res.status(404).json({ error: "Country not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteCountry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Country")
            .where({
                CountryID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Country deleted successfully" });
        } else {
            res.status(404).json({ error: "Country not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addCountry = async (req, res) => {
    const { CountryID, CountryName } = req.body;

    try {
        const result = await db("Country")
            .insert({
                CountryID: CountryID,
                CountryName: CountryName,
            })
            .returning("*");

        res.status(200).json(result);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}