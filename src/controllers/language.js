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

exports.getLanguage = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Language")
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

exports.editLanguage = async (req, res) => {
    const { id } = req.params;
    const { LanguageName } = req.body;

    try {
        const updatedCount = await db("Language")
            .where({
                LanguageID: id,
            })
            .update({
                LanguageID: id,
                LanguageName: LanguageName,
            });

        if (updatedCount > 0) {
            res.json({ message: "Language updated successfully" });
        } else {
            res.status(404).json({ error: "Language not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteLanguage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Language")
            .where({
                LanguageID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Language deleted successfully" });
        } else {
            res.status(404).json({ error: "Language not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addLanguage = async (req, res) => {
    const { LanguageID, LanguageName } = req.body;

    try {
        const insertedCount = await db("Language")
            .insert({
                LanguageID: LanguageID,
                LanguageName: LanguageName,
            });

        res.status(200).json(insertedCount);
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}