import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ExternalLink, Newspaper, Clock } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  createdAt: string;
}

export default function NewsSection() {
  const { data: news, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
    refetchInterval: 60000 * 30, // Refetch every 30 minutes
    refetchIntervalInBackground: false, // Only refetch when window is focused
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Newspaper className="w-6 h-6 mr-3 text-gray-600" />
            관련 뉴스
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!news || news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Newspaper className="w-6 h-6 mr-3 text-gray-600" />
            관련 뉴스
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>아직 수집된 뉴스가 없습니다.</p>
            <p className="text-sm mt-2">금/은 관련 뉴스는 매일 자동으로 업데이트됩니다.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Newspaper className="w-6 h-6 mr-3 text-gray-600" />
          은 시세 관련 뉴스
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.slice(0, 4).map((item) => (
            <div 
              key={item.id} 
              className="border-l-4 border-green-500 pl-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="font-medium">{item.source}</span>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(item.publishedAt)}
                      </div>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 hover:text-green-700 text-xs font-medium transition-colors"
                    >
                      원문 보기
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {news.length > 4 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              총 {news.length}개의 뉴스 중 최신 4개를 표시하고 있습니다.
            </p>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            * 뉴스는 해외 금융 뉴스 소스에서 자동 수집되며, 매일 오전 9시에 업데이트됩니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}