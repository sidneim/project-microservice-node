const util = require('util')
const {Pool} = require('pg')
const pool = new Pool({
  host: 'motty.db.elephantsql.com',
  user: 'ixeatxuc',
  password: 'pY39ZrTW-Thg44m1eOX8IA26Hm3bnYIc',
  database: 'ixeatxuc',
  port: 5432,
})

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool