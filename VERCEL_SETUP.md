# Vercel 데이터베이스 환경 변수 설정 가이드

## 문제 상황
- Vercel 배포 환경에서 은 고시가 데이터가 표시되지 않음
- API 엔드포인트가 404 오류 반환
- 데이터베이스 환경 변수가 Vercel에 설정되지 않음

## 해결 방법

### 1. Vercel 대시보드에서 환경 변수 설정
1. https://vercel.com/dashboard 접속
2. dabaro 프로젝트 선택
3. Settings → Environment Variables 이동
4. 다음 환경 변수들을 추가:

```
DATABASE_URL=postgresql://[사용자명]:[비밀번호]@[호스트]:[포트]/[데이터베이스명]
PGHOST=[호스트]
PGPORT=[포트]
PGUSER=[사용자명]
PGPASSWORD=[비밀번호]
PGDATABASE=[데이터베이스명]
```

### 2. 환경 변수 값 확인
현재 로컬에서 사용 중인 데이터베이스 정보를 Vercel에 동일하게 설정해야 합니다.

### 3. 재배포
환경 변수 설정 후 자동으로 재배포되거나 수동으로 재배포를 트리거해야 합니다.

## 확인 방법
배포 완료 후 다음 URL들이 정상 작동하는지 확인:
- https://dabaro.vercel.app/api/silver-prices/latest
- https://dabaro.vercel.app/api/silver-prices
- https://dabaro.vercel.app/api/debug

## 문제 해결
만약 여전히 문제가 있다면:
1. Vercel Function Logs 확인
2. 환경 변수가 올바르게 설정되었는지 재확인
3. 데이터베이스 연결 권한 확인