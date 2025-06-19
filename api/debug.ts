import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const debugInfo = {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
      availableEnvVars: Object.keys(process.env).filter(key => 
        key.includes('DATABASE') || key.includes('PG')
      ),
    };

    console.log('[Debug API] Environment check:', debugInfo);
    res.status(200).json(debugInfo);
  } catch (error) {
    console.error('[Debug API] Error:', error);
    res.status(500).json({ error: 'Debug check failed' });
  }
}