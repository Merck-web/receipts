const Pool = require('pg-pool')

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
})

pool.on('error', (error, client) => {
    console.error(error)
    process.exit(-1)
})

pool.on('connect', client => {
    console.log('New client')
})

pool.on('remove', client => {
    console.log('Client pool removed')
})

module.exports = pool
