// const pool = require('../../config/db');
const { sql } = require('@vercel/postgres');
require('dotenv').config();

exports.createAchievement = async (req, res) => {
  const { game_id, title, description, points } = req.body;

  try {
    const newAchievement = await sql`
      'INSERT INTO Achievements (game_id, title, description, points) VALUES (${game_id}, ${title}, ${description}, ${points}) RETURNING *`;
    res.status(201).json(newAchievement.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const achievements = await sql`SELECT * FROM Achievements`;
    res.json(achievements.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
