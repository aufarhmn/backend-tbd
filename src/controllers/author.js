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

exports.getAuthors = async (req, res) => {
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