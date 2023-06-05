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

exports.getWrote = async (req, res) => {
    try {
      const results = await db('Wrote')
        .join('Author', 'Wrote.AuthorID', 'Author.AuthorID')
        .join('Book', 'Wrote.BookID', 'Book.BookID')
        .select('Wrote.*', 'Author.*', 'Book.*');
  
      res.json(results);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
};

exports.editWrote = async (req, res) => {
  const { bookidbefore, authoridbefore, authorid, bookid } = req.body;

  try {
    const updatedCount = await db('Wrote')
      .where({
        AuthorID: authoridbefore,
        BookID: bookidbefore
      })
      .update({
        AuthorID: authorid,
        BookID: bookid,
      });

    if (updatedCount > 0) {
      res.json({ message: 'Wrote updated successfully' });
    } else {
      res.status(404).json({ error: 'Wrote not found' });
    }
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteWrote = async (req, res) => {
  const { bookid, authorid } = req.params;

  try {
    const deletedCount = await db('Wrote')
      .where({
        BookID: bookid,
        AuthorID: authorid
      })
      .del();

    if (deletedCount === 0) {
      res.status(404).json({ error: 'Wrote not found' });
    } else {
      res.json({ message: 'Wrote deleted successfully' });
    }
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.addWrote = async (req, res) => {
  const { bookid, authorid } = req.body;

  try {
    const result = await db('Wrote')
      .insert({
        BookID: bookid,
        AuthorID: authorid
      });

    res.status(200).json({ message: 'Wrote added successfully' });
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
}
