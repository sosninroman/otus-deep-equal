import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  testMatch: ["**/?*.test.js"],
  moduleFileExtensions: ["js", "json", "node"],
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
