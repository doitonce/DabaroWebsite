import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-korean">
            다바로를 소개합니다
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-korean">
            전문적인 브레이징 기술과 혁신적인 솔루션으로 고객의 성공을 함께 만들어가는 기업입니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
              alt="Professional modern company building"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-korean">
              기술과 품질의 선두주자
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed font-korean">
              다바로는 브레이징 용접, 전기접점, 은납 분야에서 축적된 전문 기술력과 경험을 바탕으로
              최고 품질의 제품과 서비스를 제공하는 전문기업입니다.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed font-korean">
              지속적인 품질 향상과 풍부한 경험을 통해 고객의 다양한 요구사항에 유연하게 대응하며,
              신뢰할 수 있는 파트너로서 함께 성장해 나가고 있습니다.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold dabaro-primary mb-2">15+</div>
                <div className="text-gray-600 font-korean">년간 경험</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <div className="text-3xl font-bold dabaro-primary mb-2">120+</div>
                <div className="text-gray-600 font-korean">성공 프로젝트</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
