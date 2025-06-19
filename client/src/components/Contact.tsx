import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "문의 접수 완료",
        description: "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
      });
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        inquiryType: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "문의 접수 실패",
        description: error.message || "문의 접수 중 오류가 발생했습니다. 다시 시도해 주세요.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.email || !formData.inquiryType || !formData.message) {
      toast({
        title: "입력 오류",
        description: "필수 항목을 모두 입력해 주세요.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "본사 주소",
      content: "인천 남동구 인주대로 878, 지층"
    },
    {
      icon: Phone,
      title: "전화번호",
      content: "+82 032-467-0017"
    },
    {
      icon: Mail,
      title: "이메일",
      content: "dabaro0432@naver.com"
    },
    {
      icon: Clock,
      title: "운영시간",
      content: "평일 09:00 - 18:00"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-korean">
            연락처 및 문의
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-korean">
            다바로와 함께할 새로운 프로젝트에 대해 언제든지 문의해 주세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-korean">연락처 정보</h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-dabaro-primary text-white p-3 rounded-lg">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 font-korean">{info.title}</h4>
                    <p className="text-gray-600 font-korean whitespace-pre-line">{info.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 p-6 bg-white rounded-xl shadow-lg"
            >
              <h4 className="font-semibold text-gray-900 mb-4 font-korean">추가 연락처</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>팩스: +82 032-467-0018</p>
                <p>휴대폰: 010-6231-9752</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-korean">
              문의&nbsp;&nbsp;&nbsp;<span className="text-xl">010-6231-9752</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 font-korean">
                    성명 *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2 font-korean">
                    회사명
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="(주)회사명"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 font-korean">
                    전화번호 *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 font-korean">
                    이메일 *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 font-korean">
                  문의 유형 *
                </Label>
                <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="문의 유형을 선택해 주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brazing">브레이징 용접 문의</SelectItem>
                    <SelectItem value="electrical">전기접점 문의</SelectItem>
                    <SelectItem value="filler">은납 필러 문의</SelectItem>
                    <SelectItem value="other">기타 문의</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 font-korean">
                  문의 내용 *
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="문의하실 내용을 자세히 작성해 주세요..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-dabaro-primary hover:bg-blue-700 text-white font-semibold py-4 px-6 text-lg transition duration-300 transform hover:scale-105 font-korean"
              >
                {contactMutation.isPending ? "문의 전송 중..." : "문의 보내기"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
