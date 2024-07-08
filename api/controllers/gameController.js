const pool = require('../../config/db');

exports.createGame = async (req, res) => {
  const { title, description, release_date } = req.body;

  try {
    const newGame = await pool.query(
      'INSERT INTO Games (title, description, release_date) VALUES ($1, $2, $3) RETURNING *',
      [title, description, release_date]
    );
    res.status(201).json(newGame.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await pool.query('SELECT * FROM Games');
    res.json(games.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
