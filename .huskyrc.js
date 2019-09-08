module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'pre-push': 'yarn test',
    'post-merge': 'yarnhook',
    'post-checkout': 'yarnhook',
    'post-rewrite': 'yarnhook',
  },
};
