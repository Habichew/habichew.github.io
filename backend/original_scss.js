const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();
const hostname = 'nodejs_habichew';
const port = 3000;
const project_name = 'habichew';

// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define the root route that renders our index page
app.get('/', (req, res) => {
  res.render('index', { project_name });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: 'mariadb_habichew',      
  user: 'habichew',
  password: 'WTq7KCTvSzqHntNu',
  database: 'habichew_db',
  connectionLimit: 5
});

async function main() {
  let conn;
  try {
    conn = await pool.getConnection();

    // Create table if it doesn't exist
    await conn.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Table 'test_table' is ready.");


    // Insert a new row into the table
    const result = await conn.query("INSERT INTO test_table (name) VALUES (?)", ['John Doe']);
    console.log("Inserted row with id:", result.insertId);

    // Query the table to get all rows
    const rows = await conn.query("SELECT * FROM test_table");
    console.log("Table contents:");
    console.table(rows);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    if (conn) conn.release(); // release to pool
    pool.end(); // close the pool when done
  }
}

main();
