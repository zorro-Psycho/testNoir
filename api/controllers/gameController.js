// const pool = require('../../config/db');
const { sql } = require('@vercel/postgres');
require('dotenv').config();

exports.createGame = async (req, res) => {
  const { title, description, release_date } = req.body;

  try {
    const newGame = await sql`INSERT INTO Games (title, description, release_date) VALUES (${title}, ${description}, ${release_date}) RETURNING *`;
    res.status(201).json(newGame.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await sql`SELECT * FROM Games`;
    res.json(games.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
