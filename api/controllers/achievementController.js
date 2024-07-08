const pool = require('../../config/db');

exports.createAchievement = async (req, res) => {
  const { game_id, title, description, points } = req.body;

  try {
    const newAchievement = await pool.query(
      'INSERT INTO Achievements (game_id, title, description, points) VALUES ($1, $2, $3, $4) RETURNING *',
      [game_id, title, description, points]
    );
    res.status(201).json(newAchievement.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const achievements = await pool.query('SELECT * FROM Achievements');
    res.json(achievements.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
