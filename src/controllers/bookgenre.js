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

exports.getBookGenre = async (req, res) => {
    try {
        const BookGenre = await db
          .select('BookGenre.*', 'Book.*', 'Genre.*')
          .from('BookGenre')
          .join('Book', 'BookGenre.BookID', 'Book.BookID')
          .join('Genre', 'BookGenre.GenreID', 'Genre.GenreID');
          
        res.status(200).json(BookGenre);
      } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
}

exports.editBookGenre = async (req, res) => {
    const { bookidbefore, genreidbefore, genreid, bookid } = req.body;

    try {
      const updatedCount = await db('BookGenre')
        .where({
          GenreID: genreidbefore,
          BookID: bookidbefore
        })
        .update({
          GenreID: genreid,
          BookID: bookid,
        });
  
      if (updatedCount > 0) {
        res.json({ message: 'Book Genre updated successfully' });
      } else {
        res.status(404).json({ error: 'Book Genre not found' });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
}

exports.deleteBookGenre = async (req, res) => {
    const { bookid, genreid } = req.params;

    try {
      const deletedCount = await db('BookGenre')
        .where({
          BookID: bookid,
          GenreID: genreid
        })
        .del();
  
      if (deletedCount > 0) {
        res.json({ message: 'Wrote deleted successfully' });
      } else {
        res.status(404).json({ error: 'Wrote not found' });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
}

exports.addBookGenre = async (req, res) => {
    const { GenreID, BookID } = req.body;

    try {
      const ids = await db('BookGenre')
        .insert({
          GenreID: GenreID,
          BookID: BookID,
        })
        .returning(['GenreID', 'BookID']);
  
      res.json({ message: 'Wrote added successfully', id: ids[0] });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
}
