import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "gallery", "history", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "홈" },
    { id: "about", label: "회사소개" },
    { id: "services", label: "사업영역" },
    { id: "gallery", label: "제품갤러리" },
    { id: "history", label: "회사연혁" },
    { id: "contact", label: "연락처" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold text-gradient font-korean"
            >다바로 브레이징</button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* 홈 */}
              <button
                onClick={() => scrollToSection("home")}
                className={`nav-link font-medium transition-colors ${
                  activeSection === "home"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                홈
              </button>
              {/* 회사소개 */}
              <button
                onClick={() => scrollToSection("about")}
                className={`nav-link font-medium transition-colors ${
                  activeSection === "about"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                회사소개
              </button>
              {/* 사업영역 */}
              <button
                onClick={() => scrollToSection("services")}
                className={`nav-link font-medium transition-colors ${
                  activeSection === "services"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                사업영역
              </button>
              {/* 은고시가 */}
              <Link 
                href="/silver-price"
                className={`nav-link font-medium transition-colors ${
                  location === "/silver-price"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                은고시가
              </Link>
              {/* 제품재고 */}
              <Link 
                href="/inventory"
                className={`nav-link font-medium transition-colors ${
                  location === "/inventory"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                제품재고
              </Link>
              {/* 제품갤러리 */}
              <button
                onClick={() => scrollToSection("gallery")}
                className={`nav-link font-medium transition-colors ${
                  activeSection === "gallery"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                제품갤러리
              </button>
              {/* 회사연혁 */}
              <button
                onClick={() => scrollToSection("history")}
                className={`nav-link font-medium transition-colors ${
                  activeSection === "history"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                회사연혁
              </button>
              {/* 연락처 */}
              <button
                onClick={() => scrollToSection("contact")}
                className={`nav-link font-medium transition-colors ${
                  activeSection === "contact"
                    ? "dabaro-primary"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                연락처
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* 홈 */}
            <button
              onClick={() => scrollToSection("home")}
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                activeSection === "home"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              홈
            </button>
            {/* 회사소개 */}
            <button
              onClick={() => scrollToSection("about")}
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                activeSection === "about"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              회사소개
            </button>
            {/* 사업영역 */}
            <button
              onClick={() => scrollToSection("services")}
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                activeSection === "services"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              사업영역
            </button>
            {/* 은고시가 */}
            <Link 
              href="/silver-price"
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                location === "/silver-price"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              은고시가
            </Link>
            {/* 제품재고 */}
            <Link 
              href="/inventory"
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                location === "/inventory"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              제품재고
            </Link>
            {/* 제품갤러리 */}
            <button
              onClick={() => scrollToSection("gallery")}
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                activeSection === "gallery"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              제품갤러리
            </button>
            {/* 회사연혁 */}
            <button
              onClick={() => scrollToSection("history")}
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                activeSection === "history"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              회사연혁
            </button>
            {/* 연락처 */}
            <button
              onClick={() => scrollToSection("contact")}
              className={`block w-full text-left px-3 py-2 font-medium transition-colors ${
                activeSection === "contact"
                  ? "dabaro-primary"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              연락처
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
