import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "wouter";

interface SilverPrice {
  id: number;
  date: string;
  priceKrw: number;
  priceUsd: number;
  priceOunce: number;
  createdAt: string;
  updatedAt: string;
}

export default function SilverPriceSection() {
  const { data: latestPrice, isLoading, error: priceError } = useQuery<SilverPrice>({
    queryKey: ['/api/silver-prices/latest'],
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: allPrices, error: allPricesError } = useQuery<SilverPrice[]>({
    queryKey: ['/api/silver-prices'],
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  const getPriceChange = (current: SilverPrice, previous?: SilverPrice) => {
    if (!previous || !current) return { change: 0, percentage: 0, trend: 'stable' as const };
    
    // Ensure numeric values
    const currentPrice = Number(current.priceUsd) || 0;
    const previousPrice = Number(previous.priceUsd) || 0;
    
    if (previousPrice === 0) return { change: 0, percentage: 0, trend: 'stable' as const };
    
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
    
    return { change, percentage, trend };
  };

  const priceChangeData = allPrices && allPrices.length > 1 && latestPrice
    ? getPriceChange(latestPrice, allPrices[1]) 
    : null;

  // Handle error states
  if (priceError || allPricesError) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border border-red-200">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-semibold text-red-600 mb-2">은 고시가 정보 불러오기 실패</h2>
              <p className="text-gray-600">잠시 후 다시 시도해 주세요.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Handle loading states
  if (isLoading || !latestPrice) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-48"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
              {/* 왼쪽: 제목과 아이콘 */}
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-700">기준 은 고시가</h2>
                  <p className="text-xs text-gray-500">고시일: {latestPrice.date}</p>
                </div>
              </div>

              {/* 중앙: 가격 정보 */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <div className="text-xl lg:text-2xl font-bold text-gray-800">
                    ₩{(Number(latestPrice.priceUsd) || 0).toLocaleString()}
                    <span className="text-sm lg:text-base font-normal text-gray-500 ml-1">/g</span>
                  </div>
                </div>
                
                {/* 가격 변동 */}
                {priceChangeData && priceChangeData.trend !== 'stable' && (
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    {priceChangeData.trend === 'up' && (
                      <>
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        <Badge variant="outline" className="text-xs lg:text-sm px-2 py-1 text-red-600 border-red-300">
                          +₩{Math.abs(Number(priceChangeData.change) || 0).toLocaleString()} 
                          (+{Math.abs(Number(priceChangeData.percentage) || 0).toFixed(2)}%)
                        </Badge>
                      </>
                    )}
                    {priceChangeData.trend === 'down' && (
                      <>
                        <TrendingDown className="w-4 h-4 text-blue-500" />
                        <Badge variant="outline" className="text-xs lg:text-sm px-2 py-1 text-blue-600 border-blue-300">
                          -₩{Math.abs(Number(priceChangeData.change) || 0).toLocaleString()} 
                          (-{Math.abs(Number(priceChangeData.percentage) || 0).toFixed(2)}%)
                        </Badge>
                      </>
                    )}
                  </div>
                )}
                {priceChangeData && priceChangeData.trend === 'stable' && (
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Minus className="w-4 h-4 text-gray-500" />
                    <Badge variant="outline" className="text-xs lg:text-sm px-2 py-1 text-gray-500 border-gray-300">
                      변동없음
                    </Badge>
                  </div>
                )}
              </div>

              {/* 오른쪽: 상세 페이지 링크 */}
              <div className="flex justify-center lg:justify-end">
                <Link href="/silver-price">
                  <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 px-3 lg:px-4 py-1.5 text-xs lg:text-sm">
                    상세 정보 보기
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}