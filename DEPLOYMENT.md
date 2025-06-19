# Dabaro 배포 가이드

## 환경 요구사항

- Node.js 18+
- PostgreSQL 데이터베이스
- 다음 API 키들:
  - DeepL API Key (번역용)
  - GNEWS API Key (뉴스용)
  - NEWS API Key (뉴스용)

## 배포 전 준비사항

### 1. 환경변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정:

```bash
# 데이터베이스 설정
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

# 관리자 설정
VITE_ADMIN_PASSWORD=your-secure-admin-password

# 프로덕션 설정
NODE_ENV=production
```

### 2. CORS 도메인 설정
`server/index.ts`의 26-27번째 줄에서 실제 도메인으로 변경:
```javascript
? ['https://yourdomain.com', 'https://www.yourdomain.com'] // 실제 도메인으로 변경
```

## 배포 명령어

### 1. 의존성 설치
```bash
npm install
```

### 2. 애플리케이션 빌드
```bash
npm run build
```

### 3. 데이터베이스 스키마 적용
```bash
npm run db:push
```

### 4. 프로덕션 서버 시작
```bash
npm start
```

## 보안 기능

✅ **Helmet**: HTTP 보안 헤더  
✅ **CORS**: Cross-Origin 요청 제한  
✅ **Rate Limiting**: API 요청 제한 (15분당 100회)  
✅ **환경변수 관리**: 민감정보 분리  
✅ **에러 핸들링**: 프로덕션 에러 로깅  

## 모니터링

### 헬스체크 엔드포인트
```
GET /health
```

응답 예시:
```json
{
  "status": "ok",
  "timestamp": "2025-06-18T03:17:00.000Z",
  "environment": "production"
}
```

## 자동화된 기능

- **은 고시가 업데이트**: 매일 10:00-11:00 (20분 간격)
- **Kitco 뉴스 수집**: 매일 자동 실행
- **차트 데이터 업데이트**: 30분 간격

## 성능 최적화

- 정적 파일 압축
- 이미지 최적화
- 데이터베이스 쿼리 최적화
- 브라우저 캐싱

## 문제 해결

### 일반적인 문제
1. **데이터베이스 연결 실패**: DATABASE_URL 확인
2. **API 키 오류**: 환경변수 설정 확인  
3. **CORS 오류**: origin 설정 확인
4. **Rate Limit 초과**: IP당 요청 제한 확인

### 로그 확인
프로덕션 환경에서는 모든 에러가 콘솔에 기록됩니다.

## 백업 권장사항

- 데이터베이스 정기 백업
- 환경변수 파일 보안 보관
- API 키 교체 주기 관리