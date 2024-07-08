const pool = require('../../config/db');

exports.createNFT = async (req, res) => {
  const { owner_id, game_id, name, description, image_url } = req.body;

  try {
    const newNFT = await pool.query(
      'INSERT INTO NFTs (owner_id, game_id, name, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [owner_id, game_id, name, description, image_url]
    );
    res.status(201).json(newNFT.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.getNFTs = async (req, res) => {
  try {
    const nfts = await pool.query('SELECT * FROM NFTs');
    res.json(nfts.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.createTransaction = async (req, res) => {
  const { nft_id, buyer_id, seller_id, price } = req.body;

  try {
    const newTransaction = await pool.query(
      'INSERT INTO Transactions (nft_id, buyer_id, seller_id, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [nft_id, buyer_id, seller_id, price]
    );
    res.status(201).json(newTransaction.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
