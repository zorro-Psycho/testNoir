// const pool = require('../../config/db');
const { sql } = require('@vercel/postgres');
require('dotenv').config();

exports.createNFT = async (req, res) => {
  const { owner_id, game_id, name, description, image_url } = req.body;

  try {
    const newNFT = await sql`
      INSERT INTO NFTs (owner_id, game_id, name, description, image_url) VALUES (${owner_id}, ${game_id}, ${name}, ${description}, ${image_url}) RETURNING *`;
    res.status(201).json(newNFT.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getNFTs = async (req, res) => {
  try {
    const nfts = await sql`SELECT * FROM NFTs`;
    res.json(nfts.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.createTransaction = async (req, res) => {
  const { nft_id, buyer_id, seller_id, price } = req.body;

  try {
    const newTransaction = await sql`
      INSERT INTO Transactions (nft_id, buyer_id, seller_id, price) VALUES (${nft_id}, ${buyer_id}, ${seller_id}, ${price}) RETURNING *`;
    res.status(201).json(newTransaction.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
