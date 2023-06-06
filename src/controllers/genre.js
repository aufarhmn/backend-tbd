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

exports.getGenre = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Genre")
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

exports.editGenre = async (req, res) => {
    const { id } = req.params;
    const { GenreName } = req.body;

    try {
        const updatedCount = await db("Genre")
            .where({
                GenreID: id,
            })
            .update({
                GenreID: id,
                GenreName: GenreName,
            });

        if (updatedCount > 0) {
            res.json({ message: "Genre updated successfully" });
        } else {
            res.status(404).json({ error: "Genre not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Genre")
            .where({
                GenreID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Genre deleted successfully" });
        } else {
            res.status(404).json({ error: "Genre not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addGenre = async (req, res) => {
    const { GenreID, GenreName } = req.body;

    try {
        const result = await db("Genre")
            .insert({
                GenreID: GenreID,
                GenreName: GenreName,
            })
            .returning("GenreID");

        res.status(200).json(result);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}