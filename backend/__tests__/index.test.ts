import request from 'supertest';
import app from '../src/index';

describe('API Smoke Tests', () => {
  it('GET /api/ping → should return { status: "ok" }', async () => {
    const res = await request(app).get('/api/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('GET /api/gifs/trending → should return data array', async () => {
    const res = await request(app).get('/api/gifs/trending');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/gifs/search?q=cat → should return search results', async () => {
    const res = await request(app).get('/api/gifs/search?q=cat');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
