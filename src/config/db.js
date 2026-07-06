const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "ConectaEPT",
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;