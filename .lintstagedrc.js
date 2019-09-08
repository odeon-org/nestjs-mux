module.exports = {
  '**/*.{ts,js,json,md,yml}': ['prettier --write', 'git add'],
  '{src,test}/**/*.{ts,js}': ['eslint --fix', 'git add'],
};
