import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import { storage } from '../server/storage';

const app = express();

app.use(cors({
  origin: ['https://dabaro-website.vercel.app', 'https://*.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Silver prices endpoints
app.get('/silver-prices', async (_req, res) => {
  try {
    const prices = await storage.getAllSilverPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch silver prices' });
  }
});

app.get('/silver-prices/latest', async (_req, res) => {
  try {
    const price = await storage.getLatestSilverPrice();
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest silver price' });
  }
});

// News endpoints
app.get('/news', async (_req, res) => {
  try {
    const news = await storage.getRecentNews(10);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Silver chart endpoint
app.get('/silver-chart', async (_req, res) => {
  try {
    const chart = await storage.getLatestSilverChart();
    res.json(chart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch silver chart' });
  }
});

// Inventory endpoints
app.get('/inventory', async (_req, res) => {
  try {
    const inventory = await storage.getAllInventoryItems();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// Contact endpoint
app.post('/contact', async (req, res) => {
  try {
    const inquiry = await storage.createInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve) => {
    app(req as any, res as any, resolve);
  });
}