const config = {
  testEnvironment: "node",
  testMatch: ["**/?*.test.js"],
  moduleFileExtensions: ["js", "json", "node"],
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
