import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

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
    console.log('[Vercel API] Attempting to fetch latest silver price...');
    console.log('[Vercel API] DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('[Vercel API] Storage type:', storage.constructor.name);
    
    const price = await storage.getLatestSilverPrice();
    console.log('[Vercel API] Retrieved price:', price ? 'Found' : 'Not found');
    
    if (!price) {
      console.log('[Vercel API] No silver price data available');
      res.status(404).json({ error: 'No silver price data available' });
      return;
    }
    
    console.log('[Vercel API] Returning price data for date:', price.date);
    res.status(200).json(price);
  } catch (error) {
    console.error('[Vercel API] Error fetching latest silver price:', error);
    res.status(500).json({ error: 'Failed to fetch latest silver price' });
  }
}