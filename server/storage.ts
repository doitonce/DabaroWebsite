import { users, inquiries, silverPrices, news, silverCharts, inventory, type User, type InsertUser, type Inquiry, type InsertInquiry, type SilverPrice, type InsertSilverPrice, type News, type InsertNews, type SilverChart, type InsertSilverChart, type Inventory, type InsertInventory } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  createOrUpdateSilverPrice(silverPrice: InsertSilverPrice): Promise<SilverPrice>;
  getAllSilverPrices(): Promise<SilverPrice[]>;
  getLatestSilverPrice(): Promise<SilverPrice | undefined>;
  createNews(news: InsertNews): Promise<News>;
  getAllNews(): Promise<News[]>;
  getRecentNews(limit?: number): Promise<News[]>;
  clearAllNews(): Promise<void>;
  updateSilverChart(chart: InsertSilverChart): Promise<SilverChart>;
  getLatestSilverChart(): Promise<SilverChart | undefined>;
  createInventoryItem(item: InsertInventory): Promise<Inventory>;
  getAllInventoryItems(): Promise<Inventory[]>;
  getInventoryItem(id: number): Promise<Inventory | undefined>;
  updateInventoryItem(id: number, item: Partial<InsertInventory>): Promise<Inventory>;
  deleteInventoryItem(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry || undefined;
  }

  async createOrUpdateSilverPrice(insertSilverPrice: InsertSilverPrice): Promise<SilverPrice> {
    try {
      // Try to insert new record
      const [silverPrice] = await db
        .insert(silverPrices)
        .values(insertSilverPrice)
        .returning();
      return silverPrice;
    } catch (error) {
      // If date already exists, update the record
      const [updatedPrice] = await db
        .update(silverPrices)
        .set({
          ...insertSilverPrice,
          updatedAt: new Date(),
        })
        .where(eq(silverPrices.date, insertSilverPrice.date))
        .returning();
      return updatedPrice;
    }
  }

  async getAllSilverPrices(): Promise<SilverPrice[]> {
    return await db.select().from(silverPrices).orderBy(desc(silverPrices.date));
  }

  async getLatestSilverPrice(): Promise<SilverPrice | undefined> {
    const [latestPrice] = await db
      .select()
      .from(silverPrices)
      .orderBy(desc(silverPrices.date))
      .limit(1);
    return latestPrice || undefined;
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [newsItem] = await db
      .insert(news)
      .values(insertNews)
      .returning();
    return newsItem;
  }

  async getAllNews(): Promise<News[]> {
    return db
      .select()
      .from(news)
      .orderBy(desc(news.publishedAt));
  }

  async getRecentNews(limit: number = 10): Promise<News[]> {
    return db
      .select()
      .from(news)
      .orderBy(desc(news.publishedAt))
      .limit(limit);
  }

  async clearAllNews(): Promise<void> {
    await db.delete(news);
  }

  async updateSilverChart(insertChart: InsertSilverChart): Promise<SilverChart> {
    // Delete existing chart and insert new one
    await db.delete(silverCharts);
    const [chart] = await db
      .insert(silverCharts)
      .values(insertChart)
      .returning();
    return chart;
  }

  async getLatestSilverChart(): Promise<SilverChart | undefined> {
    const [chart] = await db
      .select()
      .from(silverCharts)
      .orderBy(desc(silverCharts.lastUpdated))
      .limit(1);
    return chart || undefined;
  }

  async createInventoryItem(insertInventory: InsertInventory): Promise<Inventory> {
    const inventoryData = {
      ...insertInventory,
      quantityGrams: insertInventory.quantityGrams.toString()
    };
    const [item] = await db
      .insert(inventory)
      .values(inventoryData)
      .returning();
    return item;
  }

  async getAllInventoryItems(): Promise<Inventory[]> {
    return db
      .select()
      .from(inventory)
      .orderBy(desc(inventory.createdAt));
  }

  async getInventoryItem(id: number): Promise<Inventory | undefined> {
    const [item] = await db.select().from(inventory).where(eq(inventory.id, id));
    return item || undefined;
  }

  async updateInventoryItem(id: number, updateData: Partial<InsertInventory>): Promise<Inventory> {
    const updatePayload: any = {
      ...updateData,
      updatedAt: new Date()
    };
    
    if (updateData.quantityGrams !== undefined) {
      updatePayload.quantityGrams = updateData.quantityGrams.toString();
    }
    
    const [item] = await db
      .update(inventory)
      .set(updatePayload)
      .where(eq(inventory.id, id))
      .returning();
    return item;
  }

  async deleteInventoryItem(id: number): Promise<void> {
    await db.delete(inventory).where(eq(inventory.id, id));
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inquiries: Map<number, Inquiry>;
  private silverPrices: Map<string, SilverPrice>;
  private newsItems: Map<number, News>;
  private silverCharts: SilverChart | null = null;
  private inventoryItems: Map<number, Inventory>;
  private currentUserId: number;
  private currentInquiryId: number;
  private currentSilverPriceId: number;
  private currentNewsId: number;
  private currentInventoryId: number;

  constructor() {
    this.users = new Map();
    this.inquiries = new Map();
    this.silverPrices = new Map();
    this.newsItems = new Map();
    this.silverCharts = null;
    this.inventoryItems = new Map();
    this.currentUserId = 1;
    this.currentInquiryId = 1;
    this.currentSilverPriceId = 1;
    this.currentNewsId = 1;
    this.currentInventoryId = 1;
    
    // Initialize with sample data for Vercel deployment
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    // Add sample silver price data
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '/');
    const samplePrice: SilverPrice = {
      id: this.currentSilverPriceId++,
      date: today,
      priceKrw: 156868,
      priceUsd: 1788,
      priceOunce: 49186,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.silverPrices.set(today, samplePrice);

    // Add sample inventory data
    const sampleInventory: Inventory = {
      id: this.currentInventoryId++,
      itemName: "S-30",
      silverContent: 30,
      specification: "은함량 30% 브레이징 합금",
      isRolled: false,
      quantityGrams: "150.5",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.inventoryItems.set(sampleInventory.id, sampleInventory);

    // Add sample news data
    const sampleNews: News = {
      id: this.currentNewsId++,
      title: "은 가격 동향 분석",
      description: "최근 은 시장의 가격 변동 분석 및 전망",
      url: "#",
      source: "다바로",
      publishedAt: new Date().toISOString(),
      category: "precious-metals",
      createdAt: new Date().toISOString()
    };
    this.newsItems.set(sampleNews.id, sampleNews);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      id,
      name: insertInquiry.name,
      company: insertInquiry.company || null,
      phone: insertInquiry.phone,
      email: insertInquiry.email,
      inquiryType: insertInquiry.inquiryType,
      message: insertInquiry.message,
      createdAt: new Date(),
      status: 'pending'
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async createOrUpdateSilverPrice(insertSilverPrice: InsertSilverPrice): Promise<SilverPrice> {
    const existing = this.silverPrices.get(insertSilverPrice.date);
    if (existing) {
      const updated: SilverPrice = {
        ...existing,
        priceKrw: insertSilverPrice.priceKrw,
        priceUsd: insertSilverPrice.priceUsd,
        priceOunce: insertSilverPrice.priceOunce,
        updatedAt: new Date(),
      };
      this.silverPrices.set(insertSilverPrice.date, updated);
      return updated;
    } else {
      const id = this.currentSilverPriceId++;
      const silverPrice: SilverPrice = {
        id,
        ...insertSilverPrice,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.silverPrices.set(insertSilverPrice.date, silverPrice);
      return silverPrice;
    }
  }

  async getAllSilverPrices(): Promise<SilverPrice[]> {
    return Array.from(this.silverPrices.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getLatestSilverPrice(): Promise<SilverPrice | undefined> {
    const prices = await this.getAllSilverPrices();
    return prices[0] || undefined;
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const newsItem: News = {
      id,
      title: insertNews.title,
      description: insertNews.description || null,
      url: insertNews.url,
      source: insertNews.source,
      publishedAt: insertNews.publishedAt,
      category: insertNews.category || 'precious-metals',
      createdAt: new Date(),
    };
    this.newsItems.set(id, newsItem);
    return newsItem;
  }

  async getAllNews(): Promise<News[]> {
    return Array.from(this.newsItems.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getRecentNews(limit: number = 10): Promise<News[]> {
    const allNews = await this.getAllNews();
    return allNews.slice(0, limit);
  }

  async clearAllNews(): Promise<void> {
    this.newsItems.clear();
  }

  async updateSilverChart(insertChart: InsertSilverChart): Promise<SilverChart> {
    const id = 1; // Single chart entry
    const chart: SilverChart = {
      id,
      imageUrl: insertChart.imageUrl,
      imageData: insertChart.imageData,
      lastUpdated: insertChart.lastUpdated || new Date(),
      createdAt: new Date(),
    };
    this.silverCharts = chart;
    return chart;
  }

  async getLatestSilverChart(): Promise<SilverChart | undefined> {
    return this.silverCharts || undefined;
  }

  async createInventoryItem(insertInventory: InsertInventory): Promise<Inventory> {
    const id = this.currentInventoryId++;
    const item: Inventory = {
      id,
      itemName: insertInventory.itemName,
      silverContent: insertInventory.silverContent,
      specification: insertInventory.specification,
      isRolled: insertInventory.isRolled,
      quantityGrams: insertInventory.quantityGrams.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.inventoryItems.set(id, item);
    return item;
  }

  async getAllInventoryItems(): Promise<Inventory[]> {
    return Array.from(this.inventoryItems.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getInventoryItem(id: number): Promise<Inventory | undefined> {
    return this.inventoryItems.get(id);
  }

  async updateInventoryItem(id: number, updateData: Partial<InsertInventory>): Promise<Inventory> {
    const existing = this.inventoryItems.get(id);
    if (!existing) {
      throw new Error(`Inventory item with id ${id} not found`);
    }
    
    const updated: Inventory = {
      ...existing,
      itemName: updateData.itemName ?? existing.itemName,
      silverContent: updateData.silverContent ?? existing.silverContent,
      specification: updateData.specification ?? existing.specification,
      isRolled: updateData.isRolled ?? existing.isRolled,
      quantityGrams: updateData.quantityGrams !== undefined ? updateData.quantityGrams.toString() : existing.quantityGrams,
      updatedAt: new Date(),
    };
    this.inventoryItems.set(id, updated);
    return updated;
  }

  async deleteInventoryItem(id: number): Promise<void> {
    this.inventoryItems.delete(id);
  }
}

export const storage = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL 
  ? new MemStorage() 
  : new DatabaseStorage();
