import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import brazingImage from "@assets/photo-1576836619094-6a1b736b0b0f_1750053079268.jpg";
import processFlowImage from "@assets/qmfpdlwld rhdwjdeh 11_1750064122005.png";

export default function Brazing() {
  useEffect(() => {
    // 페이지 로드시 상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    // 상세페이지에서 문의하기 클릭 시 플래그 설정
    sessionStorage.setItem('scrollToContact', 'true');
    window.location.href = "/#contact";
  };

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            브레이징 용접 기술
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            정밀하고 신뢰할 수 있는 금속 접합 솔루션
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">브레이징이란?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed mb-6">
                브레이징은 두 개 이상의 서로 다른 금속 부품을 튼튼하게 접합하는 고급 기술입니다. 
                이 공정의 핵심은 접합하려는 모재는 녹이지 않고, 모재보다 낮은 온도에서 녹는 특수 금속을 사용하여 접합부를 채우는 것입니다.
              </p>
              <p className="leading-relaxed mb-6">
                주로 구리, 황동, 스테인리스 스틸 등 비철금속의 접합에 폭넓게 활용되며, 일반적인 작업 온도는 <strong className="text-green-600 dark:text-green-400">750~900°C</strong> 사이에서 이루어집니다.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  브레이징 기술에 있어 가장 중요한 것은 모재와 납재간의 적합한 조합과 적절한 접합조건을 파악하는 것입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">브레이징의 주요 특징</h2>
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  다양한 접합 형태
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  넓은 면적의 면대면 접합은 물론, 복잡한 형태의 부품도 접합할 수 있어 설계 자유도가 높습니다.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  뛰어난 기밀성
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  접합부가 기체나 액체가 통과할 수 없을 만큼 <strong className="text-green-600 dark:text-green-400">높은 기밀성</strong>을 제공합니다. 
                  이는 진공 시스템이나 유체 배관처럼 누설 방지가 필수적인 중요한 부품에 특히 적합합니다.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  수정 용이성
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  다른 용접 방식에 비해 필요할 경우 접합부를 비교적 쉽게 수정하거나 분리할 수 있는 장점이 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Process Flow Diagram */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">브레이징 공정도</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="max-w-4xl mx-auto">
                <img 
                  src={processFlowImage}
                  alt="브레이징 공정도: 이음새 설계 → 전처리(탈지) → Flux 처리 → 은납 → 가열 → 냉각 → 검사 → 결함요인 분석 → 표면처리 → 출하"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">기술 사양</h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">작업 온도</h4>
                  <p className="text-gray-600 dark:text-gray-300">750~900°C</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">주요 적용 재료</h4>
                  <p className="text-gray-600 dark:text-gray-300">구리, 황동, 스테인리스 스틸</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">접합 방식</h4>
                  <p className="text-gray-600 dark:text-gray-300">모재 비용융 접합</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">주요 장점</h4>
                  <p className="text-gray-600 dark:text-gray-300">고기밀성, 설계 자유도</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">적용 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">전기접점</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">고정밀 전기 접점 부품</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">진공 시스템</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">고기밀 진공 장비</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">유체 배관</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">누설 방지 배관 시스템</p>
              </div>
            </div>
          </div>


          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">브레이징 용접 문의</h3>
            <p className="text-green-100 mb-6">
              전문 기술진이 귀하의 프로젝트에 최적화된 브레이징 솔루션을 제공합니다.
            </p>
            <button 
              onClick={handleContactClick}
              className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}