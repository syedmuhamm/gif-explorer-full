import express, { Request, Response, NextFunction } from 'express';
import axios from './httpClient';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ping route for testing
app.get('/api/ping', (_: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Logging middleware
app.use((req, _, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

const GIPHY_API_KEY = process.env.GIPHY_API_KEY!;
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

// Trending endpoint
app.get('/api/gifs/trending', async (req: Request, res: Response, next: NextFunction) => {
  const { page = '1', limit = '20' } = req.query;
  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const response = await axios.get(`${GIPHY_BASE_URL}/trending`, {
      params: { api_key: GIPHY_API_KEY, limit, offset },
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

// Search endpoint
app.get('/api/gifs/search', async (req: Request, res: Response, next: NextFunction) => {
  const { q = '', page = '1', limit = '20' } = req.query;
  const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const response = await axios.get(`${GIPHY_BASE_URL}/search`, {
      params: { api_key: GIPHY_API_KEY, q, limit, offset },
    });
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('API Error:', err.message || err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ✅ Only run server if not imported (i.e., not under test)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
  });
}

export default app;
