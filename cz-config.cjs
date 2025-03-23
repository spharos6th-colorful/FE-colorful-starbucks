module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat: A new feature' },
    { value: '🐛 fix', name: '🐛 fix: A bug fix' },
    { value: '📝 docs', name: '📝 docs: Documentation only changes' },
    { value: '🔨 refactor', name: '🔨 refactor: A code change that neither fixes a bug nor adds a feature' },
    { value: '✅ test', name: '✅ test: Adding missing tests' },
    { value: '📦️ chore', name: '📦️ chore: Changes to the build process or auxiliary tools' },
    { value: '🎨 design', name: '🎨 design: UI/UX changes' },
    { value: '🔥 hotfix', name: '🔥 hotfix: Critical hotfix' },
  ],
  subjectCase: ['lower', 'upper', 'camel', 'kebab', 'pascal', 'sentence', 'snake', 'start-case'],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
};
