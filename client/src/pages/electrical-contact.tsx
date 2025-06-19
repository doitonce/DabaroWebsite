import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import contactTypesImage from "@assets/image_1750054908185.png";

export default function ElectricalContact() {
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
            전기접점
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            신뢰할 수 있는 전기 연결을 위한 고품질 접점 솔루션
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">전기접점이란?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed mb-6">
                전기접점은 전기 회로에서 전류를 흐르게 하거나 차단하는 역할을 하는 중요한 부품입니다.
              </p>
              <p className="leading-relaxed mb-6">
                주로 <strong className="text-green-600 dark:text-green-400">은합금(Ag Alloy)</strong> 등의 도전성이 높은 소재로 제작되며, 
                차단기, 스위치, 릴레이 등 다양한 전기·전자 장치에서 사용됩니다.
              </p>
            </div>
          </div>

          {/* Main Products */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">주력 제품</h2>
            <div className="space-y-8">
              {/* AgCdO */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  AgCdO <span className="text-lg font-normal text-gray-600 dark:text-gray-400">(Ag 81%, Hv 100)</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  가장 널리 사용되는 접점소재로 내용착성과 내소모성이 좋고, 개폐시의 접촉저항 및 온도상승도 낮아 안정된 특성을 가지고 있습니다.
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-200">은 함량</div>
                    <div className="text-green-600 dark:text-green-400">81%</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-200">경도</div>
                    <div className="text-green-600 dark:text-green-400">Hv 100</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-200">내용착성</div>
                    <div className="text-green-600 dark:text-green-400">우수</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-semibold text-green-800 dark:text-green-200">내소모성</div>
                    <div className="text-green-600 dark:text-green-400">우수</div>
                  </div>
                </div>
              </div>

              {/* AgSnO2 */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  AgSnO2 <span className="text-lg font-normal text-gray-600 dark:text-gray-400">(Ag 89%, Hv 110)</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">비 카드늄계(Cd free) 중 가장 널리 사용되는 소재로, AgCdO계에 비하여 내용착성, 내소모성이 매우 우수한 친환경 소재입니다.</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  산화물 입자의 미세화 및 균일분산을 통해 AgCdO 대비 소형화 및 안정적 수명연장이 가능합니다.
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">은 함량</div>
                    <div className="text-blue-600 dark:text-blue-400">89%</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">경도</div>
                    <div className="text-blue-600 dark:text-blue-400">Hv 110</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">친환경</div>
                    <div className="text-blue-600 dark:text-blue-400">무카드늄</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-semibold text-blue-800 dark:text-blue-200">수명</div>
                    <div className="text-blue-600 dark:text-blue-400">연장</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Types */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">접점 형상</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">리벳 타입</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  원형 리벳 형태로 설치가 간편하고 안정적인 접촉을 제공합니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">판상형 타입</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  평면 형태로 넓은 접촉면적을 제공하여 대전류 용도에 적합합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <img 
                src={contactTypesImage} 
                alt="전기접점 제품 형상 및 타입별 분류"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Applications */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">적용 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">차단기</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">고전압 회로 차단용 접점</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">스위치</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">전기 회로 개폐용 접점</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">릴레이</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">자동 제어용 접점</p>
              </div>
            </div>
          </div>

          {/* Technical Advantages */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">기술적 우위</h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">우수한 도전성</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">은 기반 합금으로 최고 수준의 전기 전도성</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">뛰어난 내구성</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">반복적인 개폐 동작에도 안정적인 성능 유지</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">낮은 접촉저항</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">효율적인 전력 전송과 발열 최소화</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">친환경 소재</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">무카드늄 제품으로 환경 친화적</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">전기접점 문의</h3>
            <p className="text-green-100 mb-6">
              귀하의 전기·전자 장치에 최적화된 고품질 전기접점 솔루션을 제공합니다.
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