module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      'standard', 
      'prettier/standard', 
      'prettier/react', 
      'airbnb', 
      'plugin:react/recommended',
      'plugin:mdx/recommended',
      'plugin:react-hooks/recommended',
      'next/core-web-vitals'
    ],
    globals: {
      artifacts: 'readonly',
      web3: 'readonly',
      contract: 'readonly',
      before: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
      describe: 'readonly',
      it: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        tsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'babel',
      'standard',
      'prettier',
      'react',
      'simple-import-sort',
      'import'
    ],
    rules: {
      'no-underscore-dangle': 0,
      "no-unused-vars": [2, { "argsIgnorePattern": "^_" }],
      'no-console': 0,
      'arrow-parens': [2, 'as-needed'],
      'global-require': 0,
      'object-curly-newline': [2, {
        'multiline': true,
        'minProperties': 5,
        'consistent': true
      }],  
      'max-len': [2, {
        'code': 140,
        'tabWidth': 4, 
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreComments': true,
      }],

      // JSX + TypeScript
      "react/jsx-filename-extension": [2, { "extensions": [".jsx", ".tsx"] }],

      // Next
      "@next/next/no-html-link-for-pages": [2, "./frontend/pages/"],
  
      // React
      'react/jsx-curly-spacing': [2, 'always'],
      'react/sort-prop-types': [2, {
        'callbacksLast': true,
        'ignoreCase': true,
        'requiredFirst': true,
        'sortShapeProp': true,
        'noSortAlphabetically': false
      }],
      'react/jsx-sort-props': [2, {
        'callbacksLast': true,
        'ignoreCase': true,
        'noSortAlphabetically': false,
        'shorthandFirst': false,
        'shorthandLast': false,
        'reservedFirst': true
      }],
      'react/boolean-prop-naming': [2, {
        'rule': '^(is|has|use|show|hide)[A-Z]([A-Za-z0-9]?)+',
        'validateNested': true
      }],
      'react/forbid-dom-props': 2,
      "react/forbid-dom-props": [2, { "forbid": ["style"] }],
  
      // Imports
      'import/no-cycle': 1,
      'import/first': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      'import/no-extraneous-dependencies': 0,
      "import/extensions": [
        2,
        "ignorePackages",
        {
          "js": "never",
          "jsx": "never",
          "ts": "never",
          "tsx": "never"
        }
      ],
      'import/prefer-default-export': 0,
      'simple-import-sort/sort': [
        2, // Display error when an import is not sorted properly
        {
          'groups': [
            [
              '^react', // `react` related packages come first.
              '^next', // `react` related packages come second.
              '^mantine', // `react` related packages come third.
              '^@?\\w'  // Rest of packages. Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ],
            [
              '^', // Absolute imports. Anything not matched in another group.
              '^(pages|app|assets|types|services|contexts|components|utils|config|content|hooks|styles)'  // Internal packages, absolute path aliases.
            ],
            ['^\\u0000'], // Side effect imports.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
            ['^.+\\.s?css$'] // Style imports.
          ]
        }
      ],
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['pages', './frontend/pages'], 
            ['assets', './frontend/assets'], 
            ['types', './frontend/types'], 
            ['services', './frontend/services'], 
            ['contexts', './frontend/contexts'], 
            ['components', './frontend/components'], 
            ['config', './frontend/config'], 
            ['content', './frontend/content'], 
            ['utils', './frontend/utils'], 
            ['hooks', './frontend/hooks'], 
            ['styles', './frontend/styles'], 
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx','.json', '.css', '.scss'],
        },
      },
      'mdx/code-blocks': true,
    },
  };
  