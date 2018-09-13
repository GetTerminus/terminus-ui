module.exports = {
  "globals": {
    "ts-jest": {
      "tsConfigFile": "./terminus-ui/tsconfig.spec.json",
      "ignoreCoverageForAllDecorators": true,
    },
    "__TRANSFORM_HTML__": true,
  },
  "transform": {
    "^.+\\.(ts|js|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
  },
  "testMatch": [
    "<rootDir>/**/?(*.)spec.ts?(x)",
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/node_modules/",
    "<rootDir>/demo/app",
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx)",
  ],
  "reporters": ["default", [ "jest-junit", { output: "./coverage/junit/report.xml" } ]],
  "clearMocks": true,
  "collectCoverageFrom": [
    "terminus-ui/src/**/!(index|public-api|*.module|*.interface|*.constant|*.mock|*.d).ts",
    "!terminus-ui/src/utilities/rxjs-lift-hack.ts",
    "!terminus-ui/src/module.ts",
    "!terminus-ui/src/chart/*"
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "html",
  ],
  "coverageDirectory": "<rootDir>/coverage/",
  "setupTestFrameworkScriptFile": "<rootDir>/tooling/jest-setup.ts",
  "moduleNameMapper": {
    "app/(.*)": "<rootDir>/demo/app/$1",
    "assets/(.*)": "<rootDir>/demo/assets/$1",
    "environments/(.*)": "<rootDir>/demo/environments/$1",
  },
}
