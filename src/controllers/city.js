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

exports.getCity = async (req, res) => {
    try {
        const result = await db
            .select('City.*', 'Country.*')
            .from('City')
            .join('Country', 'City.CountryID', 'Country.CountryID');

        res.status(200).json(result);
    } catch (error) {
        console.error("Error retrieving table content:", error);
        res.status(500).json({
            error: "An error occurred while retrieving table content.",
        });
    }
}

exports.editCity = async (req, res) => {
    const { id } = req.params;
    const { CityName, CountryID } = req.body;

    try {
        const updatedCount = await db("City")
            .where({
                CityID: id,
            })
            .update({
                CityID: id,
                CityName: CityName,
                CountryID: CountryID,
            });

        if (updatedCount > 0) {
            res.json({ message: "City updated successfully" });
        } else {
            res.status(404).json({ error: "City not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteCity = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("City")
            .where({
                CityID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "City deleted successfully" });
        } else {
            res.status(404).json({ error: "City not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addCity = async (req, res) => {
    const { CityID, CityName, CountryID } = req.body;

    try {
        const newCity = await db("City")
            .insert({
                CityID: CityID,
                CityName: CityName,
                CountryID: CountryID,
            });

        if (newCity) {
            res.json({ message: "City added successfully" });
        } else {
            res.status(404).json({ error: "City not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}
