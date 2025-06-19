# GitHub 저장소 연동 가이드

## 1. GitHub에서 새 저장소 생성

1. GitHub에 로그인
2. "New repository" 클릭
3. 저장소 이름: `dabaro-website` (또는 원하는 이름)
4. Private/Public 선택
5. "Create repository" 클릭

## 2. 로컬에서 GitHub 원격 저장소 연결

터미널에서 다음 명령어 실행:

```bash
# 원격 저장소 추가 (your-username을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/your-username/dabaro-website.git

# 현재 브랜치를 main으로 설정
git branch -M main

# 모든 파일 스테이징
git add .

# 첫 번째 커밋
git commit -m "Initial commit: Dabaro corporate website with security enhancements"

# GitHub에 푸시
git push -u origin main
```

## 3. 중요 파일 확인

다음 파일들이 준비되어 있습니다:

✅ `.gitignore` - 환경변수 및 민감한 파일 제외  
✅ `README.md` - 프로젝트 문서화  
✅ `.env.example` - 환경변수 템플릿  
✅ `DEPLOYMENT.md` - 배포 가이드  

## 4. GitHub Actions 설정 (선택사항)

자동 배포를 위한 `.github/workflows/deploy.yml` 설정:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to server
      run: |
        # 실제 배포 스크립트 추가
        echo "Deploy to your server"
```

## 5. 환경변수 보안 설정

GitHub에서 환경변수 설정:
1. 저장소 → Settings → Secrets and variables → Actions
2. 다음 시크릿 추가:
   - `DATABASE_URL`
   - `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`
   - `DEEPL_API_KEY`, `GNEWS_API_KEY`, `NEWS_API_KEY`
   - `VITE_ADMIN_PASSWORD`

## 6. 협업 설정

팀원 추가:
1. 저장소 → Settings → Manage access
2. "Invite a collaborator" 클릭
3. GitHub 사용자명 또는 이메일 입력

## 문제 해결

**인증 오류 발생시:**
```bash
# Personal Access Token 사용
git remote set-url origin https://your-token@github.com/your-username/dabaro-website.git
```

**브랜치 충돌시:**
```bash
git pull origin main --allow-unrelated-histories
```