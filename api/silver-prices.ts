import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const prices = await storage.getAllSilverPrices();
    if (!prices || prices.length === 0) {
      res.status(200).json([]);
      return;
    }
    // Sort by date descending to ensure latest first
    const sortedPrices = prices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.status(200).json(sortedPrices);
  } catch (error) {
    console.error('Error fetching silver prices:', error);
    res.status(500).json({ error: 'Failed to fetch silver prices' });
  }
}