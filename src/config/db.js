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

module.exports = db;