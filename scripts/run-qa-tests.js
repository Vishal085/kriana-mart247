const path = require('path');
const jiti = require('jiti')(__filename, {
  alias: {
    '@': path.resolve(__dirname, '..'),
  },
});
jiti(path.resolve(__dirname, '../__tests__/qa-audit.test.ts'));
