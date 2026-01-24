# ADsP AI Pass 문서 사이트

이 웹사이트는 [Docusaurus](https://docusaurus.io/)를 사용하여 구축되었습니다.

## 설치

```bash
npm install
```

또는

```bash
yarn install
```

## 로컬 개발

개발 서버를 시작합니다:

```bash
npm start
```

또는

```bash
yarn start
```

이 명령은 로컬 개발 서버를 시작하고 브라우저 창을 엽니다. 대부분의 변경사항은 서버를 재시작하지 않고도 실시간으로 반영됩니다.

기본적으로 `http://localhost:3000`에서 실행됩니다.

## 빌드

정적 콘텐츠를 생성합니다:

```bash
npm run build
```

또는

```bash
yarn build
```

이 명령은 `build` 디렉토리에 정적 콘텐츠를 생성하며, 모든 정적 콘텐츠 호스팅 서비스를 사용하여 제공할 수 있습니다.

## 빌드 결과 미리보기

빌드된 사이트를 로컬에서 미리볼 수 있습니다:

```bash
npm run serve
```

또는

```bash
yarn serve
```

## 배포

### GitHub Pages

SSH 사용:

```bash
USE_SSH=true npm run deploy
```

SSH 미사용:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

GitHub Pages를 호스팅으로 사용하는 경우, 이 명령은 웹사이트를 빌드하고 `gh-pages` 브랜치로 푸시하는 편리한 방법입니다.

### Vercel

현재 `.vercelignore`에 `docs-site/`가 포함되어 있어 메인 프로젝트와 별도로 배포해야 합니다.

Vercel에서 별도 프로젝트로 설정:
1. Vercel 대시보드에서 새 프로젝트 생성
2. 루트 디렉토리를 `docs-site`로 설정
3. 빌드 명령: `npm run build`
4. 출력 디렉토리: `build`

## 현재 배포 상태

⚠️ **배포 미설정 상태**

- `docusaurus.config.ts`의 `url`이 `https://your-docusaurus-site.example.com`으로 설정되어 있음
- GitHub Pages 배포 설정은 되어 있으나 실제 URL 미설정
- Vercel 배포는 `.vercelignore`에 의해 제외됨

## 문서 구조

- `docs/ui-ux/components/`: UI 컴포넌트 문서
- `docs/ui-ux/pages/`: 페이지 문서
- `docs/ui-ux/flows/`: 사용자 플로우 및 계층 구조 문서
