module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // no-mixed-spaces-and-tabsルールをoffに設定する
    'no-mixed-spaces-and-tabs': 'off',
    // // インデントはスペースで統一
    indent: ['error', 2, { SwitchCase: 1 }],

    // // タブ文字は使用しない
    // 'no-tabs': 'error',

    /**
     * @description importが型のみの場合は、import typeを強制
     */
    '@typescript-eslint/consistent-type-imports': 'error',

    /**
     * @description propsを自動でソート
     * @see {@link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md}
     */
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
  },
};
