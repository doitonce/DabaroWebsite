import { Facebook, Linkedin, Youtube } from "lucide-react";
import logoImage from "@assets/55555555_1750080213653.png";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-dabaro-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-gradient font-korean">(주)다바로</h3>
            <p className="text-gray-300 mb-6 leading-relaxed font-korean">
              브레이징 용접, 전기접점, 은납 전문기업으로 최고의 품질과 기술력을 제공합니다.
              고객과 함께 성장하는 신뢰할 수 있는 파트너입니다.
            </p>
            <div className="flex justify-start">
              <img 
                src={logoImage} 
                alt="다바로 로고" 
                className="h-12 w-auto"
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-korean">빠른 링크</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-sky-400 transition duration-300 font-korean"
                >
                  회사소개
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-sky-400 transition duration-300 font-korean"
                >
                  사업영역
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-gray-300 hover:text-sky-400 transition duration-300 font-korean"
                >
                  제품갤러리
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("history")}
                  className="text-gray-300 hover:text-sky-400 transition duration-300 font-korean"
                >
                  회사연혁
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-korean">연락처</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="font-korean">인천 남동구 인주대로 878, 지층</li>
              <li>+82 032-467-0017</li>
              <li>dabaro0432@naver.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 font-korean">
            © 2024 다바로 (Dabaro). All rights reserved. | 브레이징 용접 • 전기접점 • 은납 전문기업
          </p>
        </div>
      </div>
    </footer>
  );
}
