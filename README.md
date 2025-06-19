# 다바로(Dabaro) 기업 웹사이트

> 한국 은 시장을 위한 종합 금융 정보 플랫폼과 실시간 재고 및 가격 관리 시스템을 제공하는 정교한 기업 웹사이트

## 🚀 주요 기능

### 💼 비즈니스 핵심 기능
- **실시간 은 고시가 추적**: 국내 시장 가격 자동 업데이트
- **재고 관리 시스템**: 실시간 가격 계산 및 재고 추적
- **국제 뉴스 통합**: Kitco.com 뉴스 자동 번역
- **실시간 차트**: Kitco 은 가격 차트 자동 업데이트
- **문의 시스템**: 이메일 알림 기능

### 🔧 기술적 특징
- **React.js**: 반응형 모던 UI
- **Framer Motion**: 동적 애니메이션
- **TypeScript**: 강력한 타입 안전성
- **PostgreSQL**: 안정적인 데이터베이스
- **실시간 가격 연동**: 자동화된 시장 데이터 수집

## 🛠️ 기술 스택

### Frontend
- React.js 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Tanstack Query
- Wouter (라우팅)

### Backend
- Node.js & Express
- PostgreSQL
- Drizzle ORM
- Cheerio (웹 스크래핑)
- Nodemailer

### 보안 & 배포
- Helmet (보안 헤더)
- CORS 보호
- Rate Limiting
- 환경변수 관리

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/dabaro-website.git
cd dabaro-website
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env` 파일을 생성하고 다음 내용을 설정:
```bash
# 데이터베이스
DATABASE_URL=postgresql://username:password@host:port/database

# 이메일 설정
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# API 키
DEEPL_API_KEY=your-deepl-api-key
GNEWS_API_KEY=your-gnews-api-key
NEWS_API_KEY=your-news-api-key

# 관리자 패스워드
VITE_ADMIN_PASSWORD=your-secure-password
```

### 4. 데이터베이스 설정
```bash
npm run db:push
```

### 5. 개발 서버 실행
```bash
npm run dev
```

## 🚢 배포

### 프로덕션 빌드
```bash
npm run build
npm start
```

### 헬스체크
```bash
curl http://localhost:5000/health
```

## 📁 프로젝트 구조

```
├── client/              # Frontend 애플리케이션
│   ├── src/
│   │   ├── components/  # React 컴포넌트
│   │   ├── pages/       # 페이지 컴포넌트
│   │   └── lib/         # 유틸리티 함수
├── server/              # Backend API
│   ├── routes.ts        # API 라우트
│   ├── storage.ts       # 데이터베이스 연결
│   ├── scraper.ts       # 가격 스크래핑
│   └── email.ts         # 이메일 서비스
├── shared/              # 공유 타입 정의
├── attached_assets/     # 정적 이미지 자산
└── DEPLOYMENT.md        # 상세 배포 가이드
```

## 🔐 보안 기능

- ✅ **Helmet**: HTTP 보안 헤더
- ✅ **CORS**: Cross-Origin 요청 제한
- ✅ **Rate Limiting**: API 요청 제한 (15분당 100회)
- ✅ **환경변수 관리**: 민감정보 분리
- ✅ **에러 핸들링**: 프로덕션 에러 로깅

## 📊 자동화 기능

- **은 고시가 업데이트**: 매일 10:00-11:00 (20분 간격)
- **Kitco 뉴스 수집**: 실시간 뉴스 자동 번역
- **차트 업데이트**: 30분 간격으로 자동 갱신

## 🔧 개발 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run check        # TypeScript 타입 체크
npm run db:push      # 데이터베이스 스키마 적용
```

## 📈 API 엔드포인트

- `GET /health` - 서버 상태 확인
- `GET /api/silver-prices` - 은 고시가 조회
- `GET /api/inventory` - 재고 목록
- `GET /api/news` - 뉴스 목록
- `POST /api/contact` - 문의 접수

## 🤝 기여 방법

1. Fork 이 저장소
2. 새 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 📞 연락처

- **회사**: (주)다바로
- **이메일**: dabaro0432@naver.com
- **전화**: 010-6231-9752
- **주소**: 인천 남동구 인주대로 878, 지층