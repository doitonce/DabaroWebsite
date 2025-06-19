import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function SilverFiller() {
  useEffect(() => {
    // 페이지 로드시 상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    // 상세페이지에서 문의하기 클릭 시 플래그 설정
    sessionStorage.setItem('scrollToContact', 'true');
    window.location.href = "/#contact";
  };

  const products = [
    { code: "BAg-1", silver: 45, temp: "620 ~ 760", feature: "유동성이 좋고, 은납 중에서 가장 낮은 작업온도를 가짐." },
    { code: "BAg-1A", silver: 50, temp: "635 ~ 760", feature: "세밀하고 정밀한 이음질에 적합, 가열 조건이 다양해도 안정적인 흐름." },
    { code: "BAg-2", silver: 35, temp: "700 ~ 845", feature: "가장 보편적으로 사용되는 제품." },
    { code: "BAg-3", silver: 50, temp: "690 ~ 815", feature: "니켈을 함유. 스테인레스, 텅스텐 카바이드 팊에 유리" },
    { code: "BAg-3S", silver: 48, temp: "660 ~ 790", feature: "스테인레스, 초경 접합에 유리." },
    { code: "BAg-4", silver: 40, temp: "780 ~ 900", feature: "Cd free. 니켈을 함유. 스테인레스, 철강, 초경합금에 유리." },
    { code: "BAg-7", silver: 56, temp: "650 ~ 760", feature: "Cd free. 뛰어난 내해수성." },
    { code: "BAg-8", silver: 72, temp: "", feature: "Cd free, 진공 브레이징에 적합." },
    { code: "S-30", silver: 30, temp: "710 ~ 840", feature: "Ag함량을 줄인 경제형 개발품." },
    { code: "S-30B", silver: 30, temp: "775 ~ 890", feature: "Cd free, 넓은 이음새에 적합." }
  ];

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            은납 (Silver Filler)
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            고품질 브레이징을 위한 전문 은납 솔루션
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">은납이란?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed mb-6">
                은납은 브레이징 공정에 사용되는 용가재로 <strong className="text-green-600 dark:text-green-400">은(Ag), 구리(Cu), 아연(Zn)</strong> 등이 혼합된 금속입니다.
              </p>
              <p className="leading-relaxed mb-6">
                특히, 이종금속 간의 접합에 적합하여 다양한 산업에서 활용됩니다. 높은 전기 전도성과 강한 접합력을 갖추고 있어 
                전기·전자 부품, 배관, 항공, 자동차 부품 등의 제조에 필수적인 소재입니다.
              </p>
            </div>
          </div>

          {/* Market Trends */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">시장 동향</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">환경 친화적 제품</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    최근에는 RoHS에 대응하기 위한 비카드륨(Cd free)계의 제품도 사용이 증가하고 있는 추세입니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">경제성 개선</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    은(silver) 가격의 상승으로 인한 코스트를 낮춘 제품의 요구에도 대응하고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">제품 라인업</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">품번</th>
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Ag 함량 (%)</th>
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">작업온도 (°C)</th>
                    <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">특징</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.code} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700/50" : "bg-white dark:bg-gray-800"}>
                      <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-green-600 dark:text-green-400">
                        {product.code}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 text-center">
                        {product.silver}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 text-center">
                        {product.temp || "진공 브레이징"}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 text-sm">
                        {product.feature}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">은납의 주요 특징</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">우수한 전기전도성</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">은 기반 합금으로 뛰어난 전기 전도 특성</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">강한 접합력</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">이종금속 간 안정적이고 견고한 접합</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">우수한 유동성</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">복잡한 형상의 부품도 완전한 접합</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">내부식성</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">우수한 내부식성으로 장기간 안정성</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">다양한 온도 범위</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">620°C부터 900°C까지 다양한 작업온도</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">친환경 대응</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">Cd free 제품으로 환경 규제 대응</p>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">적용 분야</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">전기·전자 부품</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">접점, 단자, 회로 기판</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">배관 시스템</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">냉동, 공조, 급수 배관</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">항공 부품</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">엔진, 구조 부품</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">자동차 부품</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">열교환기, 브레이크 시스템</p>
              </div>
            </div>
          </div>

          {/* Selection Guide */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">제품 선택 가이드</h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">일반적인 용도</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• <strong>BAg-2:</strong> 가장 보편적, 범용적 사용</li>
                    <li>• <strong>BAg-1:</strong> 낮은 온도에서 작업 시</li>
                    <li>• <strong>S-30:</strong> 경제적 솔루션 필요 시</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">특수 용도</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>• <strong>BAg-3, BAg-3S:</strong> 스테인레스 접합</li>
                    <li>• <strong>BAg-7:</strong> 내해수성이 필요한 경우</li>
                    <li>• <strong>BAg-8:</strong> 진공 브레이징 작업</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">은납 제품 문의</h3>
            <p className="text-green-100 mb-6">
              귀하의 브레이징 공정에 최적화된 고품질 은납 솔루션을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleContactClick}
                className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                문의하기
              </button>
              <Link 
                href="/inventory"
                className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-800 transition-colors"
              >
                재고현황
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}