import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertSilverPriceSchema, insertNewsSchema, insertInventorySchema } from "@shared/schema";
import { z } from "zod";
import { getEmailService } from "./email";
import { silverScraper } from "./scraper";
import { newsScraper } from "./news-scraper";
import { chartScraper } from "./chart-scraper";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      
      // Send email notification
      const emailService = getEmailService();
      if (emailService) {
        try {
          await emailService.sendInquiryNotification(inquiry);
          console.log(`Email notification sent for inquiry ${inquiry.id}`);
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Continue without failing the request
        }
      } else {
        console.log('Email service not configured - inquiry saved but no email sent');
      }
      
      res.json({ 
        success: true, 
        message: "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
        id: inquiry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "입력 정보를 확인해 주세요.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." 
        });
      }
    }
  });

  // Get all inquiries (for admin purposes)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "문의 목록을 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  // Silver price endpoints
  app.get("/api/silver-prices", async (req, res) => {
    try {
      const prices = await storage.getAllSilverPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "은 공시가 데이터를 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  app.get("/api/silver-prices/latest", async (req, res) => {
    try {
      const latestPrice = await storage.getLatestSilverPrice();
      if (!latestPrice) {
        res.status(404).json({ 
          success: false, 
          message: "최신 은 공시가 데이터를 찾을 수 없습니다." 
        });
        return;
      }
      res.json(latestPrice);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "최신 은 공시가 데이터를 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  app.post("/api/silver-prices/scrape", async (req, res) => {
    try {
      await silverScraper.scrapeSilverPrice();
      res.json({ 
        success: true, 
        message: "은 공시가 데이터가 성공적으로 업데이트되었습니다." 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "은 공시가 데이터 업데이트 중 오류가 발생했습니다." 
      });
    }
  });

  // News endpoints
  app.get("/api/news", async (req, res) => {
    try {
      // Get recent news (최근 4개만 가져오기)
      const recentNews = await storage.getRecentNews(4);
      res.json(recentNews);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "뉴스 데이터를 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  app.get("/api/news/all", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "뉴스 데이터를 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  app.post("/api/news/scrape", async (req, res) => {
    try {
      await newsScraper.scrapeNews();
      res.json({ 
        success: true, 
        message: "뉴스 데이터가 성공적으로 업데이트되었습니다." 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "뉴스 데이터 업데이트 중 오류가 발생했습니다." 
      });
    }
  });

  // Chart endpoints
  app.get("/api/silver-chart", async (req, res) => {
    try {
      const chart = await storage.getLatestSilverChart();
      if (!chart) {
        res.status(404).json({ 
          success: false, 
          message: "차트 데이터를 찾을 수 없습니다." 
        });
        return;
      }
      res.json(chart);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "차트 데이터를 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  app.post("/api/silver-chart/scrape", async (req, res) => {
    try {
      await chartScraper.scrapeChart();
      res.json({ 
        success: true, 
        message: "차트 데이터가 성공적으로 업데이트되었습니다." 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "차트 데이터 업데이트 중 오류가 발생했습니다." 
      });
    }
  });

  // Inventory endpoints
  app.get("/api/inventory", async (req, res) => {
    try {
      const items = await storage.getAllInventoryItems();
      res.json(items);
    } catch (error) {
      console.error("Inventory fetch error:", error);
      res.status(500).json({ 
        success: false, 
        message: "재고 데이터를 불러오는 중 오류가 발생했습니다.",
        error: error.message
      });
    }
  });

  app.post("/api/inventory", async (req, res) => {
    try {
      console.log("Received inventory data:", req.body);
      const validatedData = insertInventorySchema.parse(req.body);
      console.log("Validated data:", validatedData);
      const item = await storage.createInventoryItem(validatedData);
      res.json({ 
        success: true, 
        message: "재고 항목이 성공적으로 등록되었습니다.",
        data: item 
      });
    } catch (error) {
      console.error("Inventory creation error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "입력 정보를 확인해 주세요.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "재고 등록 중 오류가 발생했습니다.",
          error: error.message 
        });
      }
    }
  });

  app.put("/api/inventory/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertInventorySchema.partial().parse(req.body);
      const item = await storage.updateInventoryItem(id, validatedData);
      res.json({ 
        success: true, 
        message: "재고 항목이 성공적으로 수정되었습니다.",
        data: item 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "입력 정보를 확인해 주세요.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "재고 수정 중 오류가 발생했습니다." 
        });
      }
    }
  });

  app.delete("/api/inventory/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteInventoryItem(id);
      res.json({ 
        success: true, 
        message: "재고 항목이 성공적으로 삭제되었습니다." 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "재고 삭제 중 오류가 발생했습니다." 
      });
    }
  });

  const httpServer = createServer(app);
  
  // Start the silver price scraper
  silverScraper.startScheduledScraping();
  
  // Start the news scraper
  newsScraper.startScheduledScraping();
  
  // Start the chart scraper
  chartScraper.startScheduledScraping();
  
  return httpServer;
}
