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
  allowCustomScopes: false,
  subjectCase: ['lower', 'upper', 'camel', 'kebab', 'pascal', 'sentence', 'snake', 'start-case'],
  subjectLimit: 100,
  commitPrefix: true,
};
