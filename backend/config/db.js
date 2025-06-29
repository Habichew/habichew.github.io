// backend/config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbConfig = {
  host: process.env.HOST || 'db', // Docker service name
  port: parseInt(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'habichew_db',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 5,
  /*acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,*/
  idleTimeout: 600000,
  // Additional MySQL 8.0 compatibility settings
  authPlugins: {
    mysql_native_password: () => () => Buffer.alloc(0)
  }
};

console.log('Database configuration:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  connectionLimit: dbConfig.connectionLimit
});

/* Connection pooling is a technique that helps improve the performance of Node.js applications which make frequent database requests.
 * Instead of opening a new connection for every request,
 * connection pooling allows the application to reuse existing connections from a pool,
 * which reduces the overhead of establishing new connections.
 */
const pool = mysql.createPool(dbConfig);

// Test the pool connection
pool.on('connection', (connection) => {
    console.log('New MySQL connection established as id ' + connection.threadId);
});

pool.on('error', (err) => {
  console.error('MySQL pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Attempting to reconnect to MySQL...');
  }
});

// Export as ES module default
export default pool;

// Also export as named export for compatibility
export { pool };