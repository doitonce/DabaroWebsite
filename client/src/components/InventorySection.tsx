import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Inventory {
  id: number;
  itemName: string;
  silverContent: number;
  specification: string;
  isRolled: boolean;
  quantityGrams: string; // Numeric type from DB comes as string
  createdAt: string;
  updatedAt: string;
}

interface SilverPrice {
  id: number;
  date: string;
  priceKrw: number;
  priceUsd: number;
  priceOunce: number;
  createdAt: string;
  updatedAt: string;
}

export default function InventorySection() {
  const { data: inventory, isLoading } = useQuery<Inventory[]>({
    queryKey: ["/api/inventory"],
  });

  const { data: silverPrice } = useQuery<SilverPrice>({
    queryKey: ["/api/silver-prices/latest"],
  });

  // Calculate unit price based on current silver price and content (원/Kg)
  const calculateUnitPrice = (silverContent: number, isRolled: boolean): number => {
    if (!silverContent) return 0;
    // Use current silver price from database, fallback to 1745 if not available
    const referenceSilverPrice = silverPrice?.priceUsd || 1745;
    const basePrice = (referenceSilverPrice * silverContent / 100) * 1000; // Convert from g to Kg
    const additionalCost = isRolled ? 100000 : 70000; // Additional cost per Kg
    return Math.floor(basePrice + additionalCost); // Remove decimals
  };

  // Format unit price for display (no decimals)
  const formatUnitPrice = (price: number): string => {
    return Math.floor(price).toLocaleString();
  };

  // Parse string values from database to numbers for calculations
  const parseNumericString = (value: string | number): number => {
    if (typeof value === 'number') return value;
    return parseFloat(value) || 0;
  };

  // Sort inventory by itemName and specification (descending)
  const sortedInventory = inventory?.sort((a, b) => {
    // First sort by itemName (descending)
    const itemCompare = b.itemName.localeCompare(a.itemName);
    if (itemCompare !== 0) return itemCompare;
    // Then sort by specification (descending)
    return b.specification.localeCompare(a.specification);
  });

  const totalItems = sortedInventory?.length || 0;
  const totalQuantity = sortedInventory?.reduce((sum, item) => sum + parseNumericString(item.quantityGrams), 0) || 0;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {isLoading ? (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">재고 정보를 불러오는 중...</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                {/* 왼쪽: 제목과 아이콘 */}
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 text-green-600" />
                  <div>
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-700">제품재고</h2>
                    <p className="text-xs text-gray-500">실시간 재고 현황</p>
                  </div>
                </div>

                {/* 중앙: 재고 정보 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <div className="text-xl lg:text-2xl font-bold text-gray-800">
                      {totalItems}개 품목
                    </div>
                  </div>
                  
                  
                </div>

                {/* 오른쪽: 버튼 */}
                <div className="flex justify-center lg:justify-end">
                  <Link href="/inventory">
                    <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 px-3 lg:px-4 py-1.5 text-xs lg:text-sm">상세 정보 보기</Button>
                  </Link>
                </div>
              </div>

              
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}