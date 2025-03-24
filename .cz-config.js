module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat' },
    { value: '🐛 fix', name: '🐛 fix' },
    { value: '📝 docs', name: '📝 docs' },
    { value: '🔨 refactor', name: '🔨 refactor' },
    { value: '✅ test', name: '✅ test' },
    { value: '📦️ chore', name: '📦️ chore' },
    { value: '🎨 design', name: '🎨 design' },
    { value: '🔥 hotfix', name: '🔥 hotfix' },
  ],
  messages: {
    type: '커밋 유형을 선택해주세요.\n',
    subject: '커밋제목을 60자이내로 명확하게 작성해주세요.\n',
    body: '본문을 작성 해주세요. 여러줄 작성시 "|" 를 사용하여 줄바꿈하세요. (첫줄|둘째줄):\n',
    confirmCommit: '모든 커밋메시지를 제대로 입력하셨나요? (y | n)',
  },
  allowCustomScopes: false,
  subjectCase: ['lower', 'upper', 'camel', 'kebab', 'pascal', 'sentence', 'snake', 'start-case'],
  subjectLimit: 60,
  skipQuestions: ['scope', 'customScope', 'breaking', 'footer'],
  commitPrefix: true,
};
