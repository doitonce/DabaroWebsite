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
    // Import storage to test database connection
    const { storage } = await import('../server/storage');
    
    let storageTest: any;
    try {
      const testPrice = await storage.getLatestSilverPrice();
      storageTest = {
        success: true,
        hasData: !!testPrice,
        dataDate: testPrice?.date || null
      };
    } catch (err) {
      storageTest = {
        success: false,
        error: String(err)
      };
    }

    const debugInfo = {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
      storageType: storage.constructor.name,
      storageTest,
      availableEnvVars: Object.keys(process.env).filter(key => 
        key.includes('DATABASE') || key.includes('SUPABASE') || key.includes('PG')
      ),
    };

    console.log('[Debug API] Environment check:', debugInfo);
    res.status(200).json(debugInfo);
  } catch (error) {
    console.error('[Debug API] Error:', error);
    res.status(500).json({ error: 'Debug check failed', details: String(error) });
  }
}