const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRE_HOST,
    user: process.env.POSTGRE_USER,
    password: process.env.POSTGRE_PASSWORD,
    database: process.env.POSTGRE_DB,
  },
});

// RAW SQL COMMANDS
exports.getUsers = async (req, res) => {
  try {
    const { sql } = req.body;

    if (!sql) {
      return res.status(400).json({ error: 'Missing SQL query.' });
    }
    const result = await db.raw(sql).catch((error) => {
      throw error;
    });

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'An error occurred while executing the SQL query.' });
  }
};