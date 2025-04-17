### Starbucks Rebuilding Project

현재 저장소는 스파로스 아카데미 6기 2조 각양각색팀의 1차 프로젝트인 스타벅스 리빌딩 프로젝트 저장소입니다.

[🚀 배포 사이트 바로가기](https://colorful-starbucks.store/)

<br/>

#### 📅 개발 기간

`2025.03.20` - `2025.04.29`

<br/>

#### 목차

1. 기술 스택
2. 주요 구현 내용
3. 기능 소개
4. 실행 방법
5. 환경 변수 설정

<br/>

#### 1. 기술 스택

<br/>

#### 2. 주요 구현 내용

<br/>

#### 3. 기능 소개

<br/>

#### 4. 실행 방법

** 프로젝트 클론 **

```
git clone https://github.com/spharos6th-colorful/FE-colorful-starbucks.git
```

** 의존성 설치 **

```
pnpm istall
npm install
```

** 개발 서버 시작 **

```
pnpm run dev
npm run dev
```

> ** Husky 설정 **
> 프로젝트에서는 `Husky`를 사용하여 Git hooks를 설정합니다. `Husky`를 통해 커밋 메시지 형식과 관련된 규칙을 관리하고, `commitlint`로 커밋 메시지가 규격을 따르는지 검사합니다.
>
> - `npm run commit` 명령어는 `cz-customizable`을 통해 사용자가 쉽게 커밋 메시지를 작성할 수 있게 돕고, 설정된 규칙에 맞게 자동으로 메시지가 검증됩니다.
> - 커밋 메시지는 `gitmoji`를 포함한 규칙에 따라 작성되며, 규칙 위반 시 커밋이 거부됩니다.
> - ESLint는 코드 스타일을 검사하고 일관성을 유지하기 위해 사용됩니다. `Husky`의 `pre-commit` hook을 통해 커밋 전에 코드 스타일 검사도 함께 진행됩니다.
>
> ** Husky 설치 ** > `Husky`는 의존성 설치 시 자동으로 설치되며, `commit-msg` hook을 설정하여 커밋 메시지를 검사합니다.
>
> ** [Gitmoji](https://gitmoji.dev/) 적용 **
> 더욱 직관적으로 커밋 메세지를 확인할 수 있도록 Gitmoji를 추가했습니다.
> 아래와 같은 명령어를 통해 Gitmoji를 적용하여 커밋할 수 있습니다.

```bash
npm run commit
```

<br/>

<br/>

<br/>

<br/>
