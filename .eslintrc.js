module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: true,
    tsconfigRootDir: __dirname,
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:unicorn/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended-type-checked",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "public/",
    "*.js",
    "next-env.d.ts",
  ],
  root: true,
  rules: {
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        replacements: {
          param: false,
          params: false,
          ref: false,
          props: false,
        },
      },
    ],
    "unicorn/no-array-reduce": "off",
    "unicorn/no-null": "off",
    "unicorn/no-array-for-each": "off",
  },
};
