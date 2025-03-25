module.exports = {
  extends: ['@commitlint/config-conventional', 'commitlint-config-gitmoji'],
  plugins: ['commitlint-plugin-gitmoji'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ 기능 추가
        'fix', // 🐛 버그 수정
        'docs', // 📝 문서 수정
        'refactor', // 🔨 리팩토링
        'test', // ✅ 테스트 추가
        'chore', // 📦️ 설정 변경
        'design', // 🎨 CSS 등 사용자 UI 디자인 변경
        'hotfix', // 🔥 급하게 치명적인 버그를 고쳐야 하는 경우
      ],
    ],
    'subject-empty': [2, 'never'], // subject는 비어있으면 안 됨
    'header-max-length': [2, 'always', 100], // 헤더 길이 제한
    'type-case': [2, 'always', 'lower-case'], // 타입은 소문자로 작성해야 함
    'type-empty': [0, 'never'], // Gitmoji를 사용할 경우 type이 없어도 허용
  },
};
