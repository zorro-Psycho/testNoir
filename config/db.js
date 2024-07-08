// const Pool = require("pg").Pool;
// require('dotenv').config();
// const pool = new Pool({
//   user: "noirgamezone_user",
//   host: "dpg-cq598tdds78s73cu4l1g-a.oregon-postgres.render.com",
//   database: "noirgamezone",
//   password: "S7J5ASZ42mHKF9Q5i0zJBxBBOQWJikxA",
//   port: 5432,
// });
// // const pool = new Pool({
// //   user: "postgres",
// //   host: "localhost",
// //   database: "noirgamezone",
// //   password: "pranshu",
// //   port: 5432,
// // });

// module.exports = pool;
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to the database');
    release();
  }
});

module.exports = pool;

