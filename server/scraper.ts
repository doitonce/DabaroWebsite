import * as cheerio from 'cheerio';
import * as cron from 'node-cron';
import { storage } from './storage';

export class SilverPriceScraper {
  private readonly URL = 'http://www.ycmetal.co.kr/price/price02.php';

  async scrapeSilverPrice(): Promise<void> {
    try {
      console.log('Starting silver price scraping...');
      
      const response = await fetch(this.URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Find the table with silver price data
      const table = $('table.tb-style3');
      if (table.length === 0) {
        throw new Error('Price table not found');
      }
      
      // Get the first data row (most recent date)
      const firstRow = table.find('tr').eq(1); // Skip header row
      if (firstRow.length === 0) {
        throw new Error('No price data found');
      }
      
      const cells = firstRow.find('td');
      if (cells.length < 4) {
        throw new Error('Incomplete price data');
      }
      
      const date = $(cells[0]).text().trim();
      const priceKrw = parseInt($(cells[1]).text().trim().replace(/,/g, ''), 10);
      const priceUsd = parseInt($(cells[2]).text().trim().replace(/,/g, ''), 10);
      const priceOunce = parseInt($(cells[3]).text().trim().replace(/,/g, ''), 10);
      
      if (isNaN(priceKrw) || isNaN(priceUsd) || isNaN(priceOunce)) {
        throw new Error('Invalid price data format');
      }
      
      // Save to database
      await storage.createOrUpdateSilverPrice({
        date,
        priceKrw,
        priceUsd,
        priceOunce,
      });
      
      console.log(`Silver price updated: ${date} - KRW: ${priceKrw}, USD: ${priceUsd}, Ounce: ${priceOunce}`);
      
    } catch (error) {
      console.error('Error scraping silver price:', error);
    }
  }

  startScheduledScraping(): void {
    // Schedule scraping every 20 minutes from 10:00 to 11:00 AM (KST)
    // 10:00, 10:20, 10:40, 11:00
    const schedules = [
      '0 10 * * *',   // 10:00 AM
      '20 10 * * *',  // 10:20 AM
      '40 10 * * *',  // 10:40 AM
      '0 11 * * *',   // 11:00 AM
    ];

    schedules.forEach((schedule, index) => {
      cron.schedule(schedule, () => {
        console.log(`Running scheduled silver price scraping (${index + 1}/4)`);
        this.scrapeSilverPrice();
      }, {
        timezone: "Asia/Seoul"
      });
    });

    console.log('Silver price scraping scheduled for 10:00-11:00 AM KST (every 20 minutes)');
    
    // Initial scraping on startup
    this.scrapeSilverPrice();
  }
}

export const silverScraper = new SilverPriceScraper();