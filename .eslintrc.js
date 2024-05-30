module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:import/typescript',
        'plugin:i18next/recommended',
        'plugin:jest-dom/recommended',
        'plugin:storybook/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'i18next',
        'jsx-a11y',
        'react',
        'react-hooks',
        'eslint-plugin-import',
        'unused-imports',
        'jest-dom',
        'simple-import-sort',
    ],
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': [1, 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [2, {
          extensions: ['.js', '.jsx', '.tsx'],
        }],
        'react/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'arrow-body-style': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/naming-convention': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
        }],
        'i18next/no-literal-string': ['error', {
            markupOnly: true,
        }],
        'max-len': ['error', {
            ignoreComments: true,
            code: 120,
        }],
        'jest-dom/prefer-checked': 'error',
        'jest-dom/prefer-enabled-disabled': 'error',
        'jest-dom/prefer-required': 'error',
        'jest-dom/prefer-to-have-attribute': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': ['error', { props: false }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        // TODO: REMOVE THIS RULES
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
    },
    overrides: [
        {
            files: [
                '*.stories.ts',
                '*.stories.tsx',
            ],
            rules: {
                'react/jsx-props-no-spreading': 'off',
            },
        },
    ],
    globals: {
        __IS_DEV__: true,
        __API__: true,
    },
};