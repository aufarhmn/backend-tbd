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

exports.getPublisher = async (req, res) => {
    try {
        const publisher = await db
          .select('Publisher.*', 'Address.*')
          .from('Publisher')
          .join('Address', 'Publisher.AddressID', 'Address.AddressID');
          
        res.status(200).json(publisher);
      } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
  };  

exports.editPublisher = async (req, res) => {
    const { id } = req.params;
    const { PublisherID, AddressID, PublisherName, YearFounded } = req.body;

    try {
        const updatedCount = await db("Publisher")
            .where({
                PublisherID: id,
            })
            .update({
                PublisherID: PublisherID,
                AddressID: AddressID,
                PublisherName: PublisherName,
                YearFounded: YearFounded,
            });

        if (updatedCount > 0) {
            res.json({ message: "Publisher updated successfully" });
        } else {
            res.status(404).json({ error: "Publisher not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.addPublisher = async (req, res) => {
    const { PublisherID, AddressID, PublisherName, YearFounded } = req.body;

    try {
        const result = await db("Publisher")
        .returning('*')
        .insert({
            PublisherID: PublisherID,
            AddressID: AddressID,
            PublisherName: PublisherName,
            YearFounded: YearFounded,
        });

        res.status(200).json(result);
    } catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}

exports.deletePublisher = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("Publisher")
            .where({
                PublisherID: id,
            })
            .del();

        if (deletedCount > 0) {
            res.json({ message: "Publisher deleted successfully" });
        } else {
            res.status(404).json({ error: "Publisher not found" });
        }
    }
    catch (err) {
        console.error("Error executing SQL query:", err);
        res.status(500).json({ error: "An error occurred" });
    }
}