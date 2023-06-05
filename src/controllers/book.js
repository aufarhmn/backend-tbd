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

exports.getBooks = async (req, res) => {
    try {
      const books = await db
        .select('Book.*', 'Publisher.*')
        .from('Book')
        .join('Publisher', 'Book.PublisherID', 'Publisher.PublisherID');
        
      res.status(200).json(books);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
};