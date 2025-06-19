import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const galleryImages = [
    {
      src: "/gallery-copper-component.jpg",
      alt: "정밀 구리 부품 및 브레이징 컴포넌트"
    },
    {
      src: "/gallery-electrical-contact.jpg",
      alt: "고품질 전기접점 제품"
    },
    {
      src: "/gallery-electrical-components.jpg",
      alt: "다양한 전기 접점 부품들"
    },
    {
      src: "/gallery-switch-contacts.jpg",
      alt: "스위치 및 릴레이 접점 제품"
    },
    {
      src: "/gallery-brazing-tools.jpg",
      alt: "브레이징 도구 및 은납 제품"
    },
    {
      src: "/gallery-metal-brackets.jpg",
      alt: "정밀 가공된 금속 브래킷 제품"
    },
    {
      src: "/gallery-silver-electrical-contacts.jpg",
      alt: "은납 전기접점 브레이징 제품"
    },
    {
      src: "/gallery-detailed-components.jpg",
      alt: "세밀한 전기 부품 및 접점"
    },
    {
      src: "/gallery-metal-contact-plates.jpg",
      alt: "금속 접점 플레이트 및 연결부품"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-korean">
            제품 갤러리
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-korean">기술은 경험에서 시작되고, 품질은 기술에서 나옵니다.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover hover:scale-105 transition duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
