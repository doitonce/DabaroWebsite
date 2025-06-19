import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, TrendingUp, Calendar, DollarSign, Coins, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from "wouter";
import NewsSection from "@/components/NewsSection";
import SilverChart from "@/components/SilverChart";

interface SilverPrice {
  id: number;
  date: string;
  priceKrw: number;
  priceUsd: number;
  priceOunce: number;
  createdAt: string;
  updatedAt: string;
}

export default function SilverPrice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const queryClient = useQueryClient();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Query for all silver prices
  const { data: allPrices, isLoading: isLoadingAll } = useQuery<SilverPrice[]>({
    queryKey: ['/api/silver-prices'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for latest silver price
  const { data: latestPrice, isLoading: isLoadingLatest } = useQuery<SilverPrice>({
    queryKey: ['/api/silver-prices/latest'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for manual scraping
  const scrapeMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/silver-prices/scrape"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/silver-prices'] });
      queryClient.invalidateQueries({ queryKey: ['/api/silver-prices/latest'] });
    },
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriceChange = (current: SilverPrice, previous?: SilverPrice) => {
    if (!previous) return null;
    
    const change = current.priceUsd - previous.priceUsd;
    const changePercent = (change / previous.priceUsd) * 100;
    
    return {
      change,
      changePercent,
      isPositive: change >= 0
    };
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getPriceForDate = (day: number) => {
    if (!allPrices) return null;
    const dateStr = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    return allPrices.find(price => {
      // Handle both date formats: "2025/06/16" and "2025/6/16"
      const priceDate = price.date;
      return priceDate === dateStr || 
             priceDate === `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${day}`;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2 h-20"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const priceData = getPriceForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();
      
      days.push(
        <div 
          key={day} 
          className={`p-2 h-20 border border-gray-200 ${isToday ? 'bg-blue-50 border-blue-300' : ''} ${priceData ? 'bg-green-50' : 'bg-gray-50'}`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          {priceData && (
            <div className="text-xs text-green-700 font-semibold">
              ₩{formatNumber(priceData.priceUsd)}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  // Chart data preparation - show entire year data
  const prepareChartData = () => {
    if (!allPrices) return [];
    
    // Sort all prices by date to show the full year trend
    const sortedPrices = [...allPrices]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return sortedPrices.map(price => ({
      date: new Date(price.date).toLocaleDateString('ko-KR', { 
        month: 'short', 
        day: 'numeric' 
      }),
      fullDate: price.date,
      price: price.priceUsd,
      formattedPrice: `₩${formatNumber(price.priceUsd)}`
    }));
  };

  const chartData = prepareChartData();

  if (isLoadingLatest && isLoadingAll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">은 공시가 데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  const priceChangeData = allPrices && allPrices.length > 1 
    ? getPriceChange(allPrices[0], allPrices[1]) 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>홈으로 돌아가기</span>
            </Link>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">다바로</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            은(Silver) 고시가
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            은 시세 정보를 확인하세요
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => scrapeMutation.mutate()}
              disabled={scrapeMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {scrapeMutation.isPending ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              데이터 업데이트
            </Button>
          </div>
        </div>

        {/* Latest Price Card */}
        {latestPrice && (
          <Card className="mb-8 border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl">
                  은 고시가
                </span>
                <Badge variant="outline" className="inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-green-700 border-green-700 font-extrabold text-[24px]">
                  {formatDate(latestPrice.date)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center">
                <div className="text-center p-6 bg-gray-50 rounded-lg max-w-md">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-sm font-medium text-gray-600">원화 (₩/g)</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">
                    {formatNumber(latestPrice.priceUsd)}
                  </div>
                  {priceChangeData && (
                    <div className={`text-sm mt-2 ${priceChangeData.isPositive ? 'text-red-600' : 'text-blue-600'}`}>
                      {priceChangeData.isPositive ? '▲' : '▼'} {formatNumber(Math.abs(priceChangeData.change))} 
                      ({priceChangeData.changePercent.toFixed(2)}%)
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Price History Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-gray-600" />
                가격 이력 달력
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold min-w-[120px] text-center">
                  {getMonthName(currentDate)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="p-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="grid grid-cols-7 gap-1">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-100">
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-50 border border-gray-200 mr-2"></div>
                <span>가격 데이터 있음</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-50 border border-blue-300 mr-2"></div>
                <span>오늘</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-50 border border-gray-200 mr-2"></div>
                <span>데이터 없음</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Trend Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-gray-600" />
              은 고시가 추세 (최근 1년)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <YAxis 
                      domain={['dataMin - 50', 'dataMax + 50']}
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                      tickFormatter={(value) => `₩${formatNumber(value)}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
                              <p className="text-sm font-medium">{`날짜: ${data.fullDate}`}</p>
                              <p className="text-sm text-green-600">{`은 고시가: ₩${formatNumber(data.price)}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#059669" 
                      strokeWidth={2}
                      dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                차트를 표시할 데이터가 없습니다.
              </div>
            )}
            <div className="mt-4 text-sm text-gray-600 text-center">
              * 최근 1년간의 은 고시가 변동 추이를 보여줍니다. (총 {chartData.length}일간의 데이터)
            </div>
          </CardContent>
        </Card>

        {/* Silver Chart Section */}
        <div className="mt-8">
          <SilverChart />
        </div>

        {/* News Section */}
        <div className="mt-8">
          <NewsSection />
        </div>

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>은 고시가 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">업데이트 시간</h4>
                <p className="text-gray-600 text-sm mb-4">
                  매일 오전 10:00 ~ 11:00 사이 20분 간격으로 자동 업데이트됩니다.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 10:00 AM (KST)</li>
                  <li>• 10:20 AM (KST)</li>
                  <li>• 10:40 AM (KST)</li>
                  <li>• 11:00 AM (KST)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">데이터 출처</h4>
                <p className="text-gray-600 text-sm mb-4">
                  유창금속공업주식회사의 고시가 정보를 가져옵니다.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  정확한 시세는 공식 거래소나 당사 담당자에게 직접 문의하시기 바랍니다.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-xs">
                    <strong>주의사항:</strong> 본 페이지의 가격 정보는 통신 장애, 데이터 전송 오류 등 기술적 문제로 인해 실제 시세와 다를 수 있습니다. 이에 따른 손해나 피해에 대해 당사는 어떠한 법적 책임도 지지 않으니, 참고용으로만 활용해 주시기 바랍니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}