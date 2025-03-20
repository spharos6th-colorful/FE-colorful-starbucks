// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'], // 기본 Conventional Commit 규칙
  plugins: ['commitlint-plugin-emoji'], // Gitmoji 지원 플러그인 추가
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
    'subject-case': [2, 'always', 'sentence-case'], // 메시지 첫 글자는 대문자로 시작
    'emoji-rule': [2, 'always'], // Gitmoji 사용을 강제
  },
};
