module.exports = {
  testRegex: "/test/unit/.*.test.js$",
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    // process js with `babel-jest`
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1"
  },
  setupFiles: ["<rootDir>/test/unit/setup", "jest-localstorage-mock"],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/*.config.js",
    "!**/components/**/script.js",
    "!**/components/number-input/**",
    "!**/coverage/**",
    "!**/dist/**",
    "!**/layouts/*.vue",
    "!**/layouts/**/script.js",
    "!**/layouts/_default/components/**",
    "!**/middleware/**",
    "!**/node_modules/**",
    "!**/pages/**",
    "!**/plugins/**",
    "!**/scripts/errors.js",
    "!**/scripts/numeral_custom_locals/**",
    "!**/test/**"
  ],
  coverageReporters: ["html", "text", "text-summary"]
};
