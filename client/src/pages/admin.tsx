import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, User, Building, MessageSquare, Calendar } from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

export default function Admin() {
  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ['/api/inquiries'],
  });

  const getInquiryTypeColor = (type: string) => {
    switch (type) {
      case '브레이징 용접':
        return 'bg-blue-100 text-blue-800';
      case '전기접점':
        return 'bg-green-100 text-green-800';
      case '은납':
        return 'bg-purple-100 text-purple-800';
      case '기술 문의':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dabaro-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-korean">문의 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-korean">고객 문의 관리</h1>
          <p className="text-gray-600 mt-2 font-korean">
            총 {inquiries.length}건의 문의가 접수되었습니다.
          </p>
        </div>

        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-korean">
                아직 접수된 문의가 없습니다
              </h3>
              <p className="text-gray-600 font-korean">
                고객 문의가 접수되면 이곳에 표시됩니다.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-3 font-korean">
                        <User className="h-5 w-5 text-dabaro-primary" />
                        {inquiry.name}
                        <Badge className={getInquiryTypeColor(inquiry.inquiryType)}>
                          {inquiry.inquiryType}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      ID: #{inquiry.id}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700 font-korean">회사명:</span>
                        <span className="text-gray-900 font-korean">{inquiry.company}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700 font-korean">연락처:</span>
                        <a href={`tel:${inquiry.phone}`} className="text-dabaro-primary hover:underline">
                          {inquiry.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700 font-korean">이메일:</span>
                        <a href={`mailto:${inquiry.email}`} className="text-dabaro-primary hover:underline">
                          {inquiry.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3 font-korean flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      문의 내용
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-korean">
                        {inquiry.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}