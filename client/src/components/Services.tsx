import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Zap, Gem, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Flame,
      title: "브레이징 용접",
      description: "정밀한 브레이징 용접 기술로 다양한 금속 소재의 접합 서비스를 제공합니다. 고온에서의 안정적인 접합으로 내구성과 신뢰성을 보장합니다.",
      image: "/dabaro-brazing-service.jpg",
      features: [
        "스테인리스 스틸 브레이징",
        "알루미늄 브레이징",
        "구리 합금 브레이징",
        "특수 소재 브레이징"
      ]
    },
    {
      icon: Zap,
      title: "전기접점",
      description: "전자 및 전기 장비용 고품질 전기접점을 제조합니다. 우수한 전도성과 내구성으로 안정적인 전기적 연결을 보장합니다.",
      image: "/electrical-contact-image.jpg",
      features: [
        "릴레이 접점",
        "스위치 접점",
        "브레이커 접점",
        "커스텀 전기접점"
      ]
    },
    {
      icon: Gem,
      title: "은납 (브레이징 필러)",
      description: "고순도 은납 브레이징 필러로 최상의 접합 품질을 제공합니다. 다양한 합금 조성으로 용도에 맞는 최적의 솔루션을 제안합니다.",
      image: "/silver-filler.jpg",
      features: [
        "고순도 은납 합금",
        "카드뮴 프리 필러",
        "플럭스 코팅 제품",
        "맞춤형 합금 개발"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-korean">
            주요 사업영역
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-korean">
            전문적인 브레이징 기술과 고품질 제품으로 다양한 산업 분야의 요구사항을 충족합니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link 
                href={index === 0 ? "/brazing" : index === 1 ? "/electrical-contact" : "/silver-filler"}
                className="block card-hover bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col h-full cursor-pointer"
              >
                <div className="mb-6">
                  <img
                    src={service.image}
                    alt={`${service.title} equipment and process`}
                    className="rounded-xl w-full h-48 object-cover"
                  />
                </div>
                
                <div className="text-center mb-4">
                  <service.icon className="w-12 h-12 dabaro-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-korean">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 text-center mb-6 font-korean">
                  {service.description}
                </p>
                
                <ul className="text-sm text-gray-500 space-y-2 font-korean mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <div className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                    자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
