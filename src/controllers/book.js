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

exports.editBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, publicationYear, pages } = req.body;

  try {
    const updatedCount = await db('Book')
      .where({ BookID: id })
      .update({
        BookTitle: title,
        Description: description,
        PublicationYear: publicationYear,
        Pages: pages,
      });

    if (updatedCount > 0) {
      res.json({ message: 'Book updated successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedCount = await db('Book')
      .where('BookID', bookId)
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.insertBooks = async (req, res) => {
  const { BookID, BookTitle, Description, PublicationYear, Pages, PublisherID, LanguageID } = req.body;

  try {
    const newBook = await db('Book')
      .returning('*')
      .insert({
        BookID,
        BookTitle,
        Description,
        PublicationYear,
        Pages,
        PublisherID,
        LanguageID,
      });

    res.status(200).json(newBook);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.editMultiple = async (req, res) => {
  const { books } = req.body;

  try {
    await db.transaction(async (trx) => {
      let success = true;

      for (const book of books) {
        const { id, BookTitle, Description, PublicationYear, Pages } = book;

        const updatedCount = await trx("Book")
          .where({ BookID: id })
          .update({
            BookTitle,
            Description,
            PublicationYear,
            Pages,
          });

        if (updatedCount === 0) {
          success = false;
          break;
        }
      }

      if (success) {
        await trx.commit();
        res.json({ message: "Book updated successfully" });
      } else {
        await trx.rollback();
        res.status(404).json({ error: "One or more books not found" });
      }
    });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};  