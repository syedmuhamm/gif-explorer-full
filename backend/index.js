const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Make sure .env file is used

const app = express();
app.use(cors());

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

// GET /api/gifs/trending
app.get('/api/gifs/trending', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const response = await axios.get(`${GIPHY_BASE_URL}/trending`, {
      params: { api_key: GIPHY_API_KEY, limit, offset },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Trending error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch trending GIFs' });
  }
});

// GET /api/gifs/search
app.get('/api/gifs/search', async (req, res) => {
  const { q = '', page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const response = await axios.get(`${GIPHY_BASE_URL}/search`, {
      params: { api_key: GIPHY_API_KEY, q, limit, offset },
    });

    res.json(response.data);
  } catch (err) {
    console.error('Search error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to search GIFs' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
