import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    extends: ['prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  {
    ignores: ['dist/*'],
  },
];
