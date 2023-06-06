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

exports.getAuthor = async (req, res) => {
    try {
        const result = await db
            .select("*")
            .from("Author")
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
};

exports.editAuthor = async (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, YearBorn, YearDied } = req.body;

    try {
        const updatedCount = await db("Author")
            .where({
                AuthorID: id,
            })
            .update({
                FirstName: FirstName,
                LastName: LastName,
                YearBorn: YearBorn,
                YearDied: YearDied,
            });

        if (updatedCount > 0) {
            res.json({ message: "Author updated successfully" });
        } else {
            res.status(404).json({ error: "Author not found" });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Author")
            .where({
                AuthorID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Author deleted successfully" });
        } else {
            res.status(404).json({ error: "Author not found" });
        }
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addAuthor = async (req, res) => {
    let { AuthorID, FirstName, LastName, YearBorn, YearDied } = req.body;

    if (YearDied === "") {
        YearDied = null;
    }

    try {
        const result = await db("Author")
            .returning('*')
            .insert({
                AuthorID: AuthorID,
                FirstName: FirstName,
                LastName: LastName,
                YearBorn: YearBorn,
                YearDied: YearDied,
            });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.editMultipleAuthors = async (req, res) => {
    const { authors } = req.body;
  
    try {
      await db.transaction(async (trx) => {
        let success = true;
  
        for (const author of authors) {
          const { id, FirstName, LastName, YearBorn, YearDied } = author;
  
          const updatedCount = await trx("Author")
            .where({ AuthorID: id })
            .update({
              FirstName,
              LastName,
              YearBorn,
              YearDied,
            });
  
          if (updatedCount === 0) {
            success = false;
            break;
          }
        }
  
        if (success) {
          await trx.commit();
          res.json({ message: "Authors updated successfully" });
        } else {
          await trx.rollback();
          res.status(404).json({ error: "One or more authors not found" });
        }
      });
    } catch (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "An error occurred" });
    }
};  