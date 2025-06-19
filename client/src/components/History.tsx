import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import partnerVitzroem from "@assets/partner-vitzroem-new.png";
import partnerOsemco from "@assets/partner-osemco.png";
import partnerSungrim from "@assets/partner-sungrim.png";
import partnerJoungil from "@assets/partner-joungil.png";
import partnerSinyoung from "@assets/partner-sinyoung.png";
import partnerDaeyoung from "@assets/partner-daeyoung.png";

export default function History() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      year: "2008년",
      title: "회사 설립",
      description: "은납, 전기접점 전문기업으로 출발, 기초 기술력 확보",
      side: "left"
    },
    {
      year: "2012년",
      title: "사업 확장",
      description: "브레이징 사업 진출, 기술 다각화 시작",
      side: "right"
    },
    {
      year: "2016년",
      title: "법인 전환",
      description: "사업장 이전 및 법인 설립",
      side: "left"
    },
    {
      year: "",
      title: "현재",
      description: "업계 신뢰받는 기업으로 성장, 지속적인 생산성 확대",
      side: "right"
    }
  ];

  return (
    <section id="history" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-korean">
            회사 연혁 & 비전
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-korean">
            지속적인 성장과 혁신을 통해 브레이징 분야의 선도기업으로 발전해온 다바로의 여정입니다
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full gradient-bg"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: event.side === "left" ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: event.side === "left" ? -30 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-center justify-between"
              >
                {event.side === "left" ? (
                  <>
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold dabaro-primary mb-2 font-korean">
                          {event.year} {event.title}
                        </h3>
                        <p className="text-gray-600 font-korean">{event.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  <>
                    <div className="w-5/12"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-lg"></div>
                    <div className="w-5/12 pl-8">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold dabaro-primary mb-2 font-korean">
                          {event.year} {event.title}
                        </h3>
                        <p className="text-gray-600 font-korean">{event.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto gradient-bg rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 font-korean">다바로의 비전</h3>
            <p className="text-lg leading-relaxed font-korean">
              "신뢰받는 브레이징 기술과 최고의 품질로 고객과 함께 성장하며,<br />
              지속 가능한 뿌리 산업으로 산업 발전에 기여하는 전문기업이 되겠습니다."
            </p>
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-korean">파트너</h3>
            <p className="text-gray-600 font-korean">다수의 협력사로부터 신뢰받는 파트너로 함께하고 있습니다
</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-20 flex items-center justify-center"
            >
              <img
                src={partnerVitzroem}
                alt="VITZROEM"
                className="max-h-12 max-w-full object-contain"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-20 flex items-center justify-center"
            >
              <img
                src={partnerOsemco}
                alt="OSEMCO"
                className="max-h-12 max-w-full object-contain"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-20 flex items-center justify-center"
            >
              <img
                src={partnerSungrim}
                alt="승림전기주식회사"
                className="max-h-12 max-w-full object-contain"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-20 flex items-center justify-center"
            >
              <img
                src={partnerJoungil}
                alt="JOUNGIL"
                className="max-h-12 max-w-full object-contain"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-20 flex items-center justify-center"
            >
              <img
                src={partnerSinyoung}
                alt="신영금속"
                className="max-h-12 max-w-full object-contain"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-full h-20 flex items-center justify-center"
            >
              <img
                src={partnerDaeyoung}
                alt="대영진금속"
                className="max-h-12 max-w-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
