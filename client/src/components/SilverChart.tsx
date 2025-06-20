import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface SilverChart {
  id: number;
  imageUrl: string;
  imageData: string;
  lastUpdated: string;
  createdAt: string;
}

export default function SilverChart() {
  const { data: chart, isLoading, refetch, isRefetching, error } = useQuery({
    queryKey: ['/api/silver-chart'],
    queryFn: async () => {
      const response = await fetch('/api/silver-chart');
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch chart data');
      }
      return response.json() as Promise<SilverChart>;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: 30 * 60 * 1000, // Auto refresh every 30 minutes
    refetchIntervalInBackground: false, // Only refetch when window is focused
    retry: 2, // Retry failed requests twice
  });

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            24시간 은 시세 차트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-gray-500 dark:text-gray-400">차트 로딩 중...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!chart) {
    return (
      <Card className="w-full mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
            실시간 은 시세 차트
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefetching}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
            새로고침
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Kitco Live Silver Chart */}
            <div className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden border p-4 flex justify-center">
              <img
                src="https://www.kitco.com/chart-images/images/live/silver.gif"
                alt="Kitco Live Silver Chart"
                className="h-auto mx-auto"
                style={{ width: '70%', maxWidth: '70%', height: 'auto' }}
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              실시간 은 가격 차트 (Kitco.com)
              <br />
              <span className="text-xs">Live data from Kitco</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const lastUpdated = new Date(chart.lastUpdated).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
          24시간 은 시세 차트
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefetching}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          새로고침
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden border p-4 flex justify-center">
            <img 
              src={`data:image/png;base64,${chart.imageData}`}
              alt="Silver Price Chart"
              className="h-auto mx-auto"
              style={{ width: '70%', maxWidth: '70%', height: 'auto' }}
              onError={(e) => {
                // Fallback to Kitco direct image if stored image fails
                const target = e.target as HTMLImageElement;
                target.src = 'https://www.kitco.com/chart-images/images/live/silver.gif';
              }}
            />
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>마지막 업데이트: {lastUpdated}</span>
            <span className="text-xs">Data from authentic financial sources</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}