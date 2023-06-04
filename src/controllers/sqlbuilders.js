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

// RAW SQL COMMANDS HANDLER
exports.rawSQL = async (req, res) => {
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

// GET ALL TABLE NAMES 
exports.getAllTable = async (req, res) => {
  try {
    const result = await db
      .select('table_name')
      .from('information_schema.tables')
      .where('table_schema', 'public');

    const tableNames = result.map((row) => row.table_name);

    res.status(200).json({ tables: tableNames });
  } catch (error) {
    console.error('Error retrieving table names:', error);
    res.status(500).json({ error: 'An error occurred while retrieving table names.' });
  }
};

// GET TABLE CONTENT
exports.getTableContent = async (req, res) => {
  try {
    const { tableName } = req.body;

    if (!tableName) {
      return res.status(400).json({ error: 'Missing table name.' });
    }

    const result = await db.select('*').from(tableName).catch((error) => {
      throw error;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error retrieving table content:', error);
    res.status(500).json({ error: 'An error occurred while retrieving table content.' });
  }
}