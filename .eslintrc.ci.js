module.exports = {
  "extends": ["@terminus/eslint-config-frontend"],
  "parserOptions": {
    "ecmaVersion": 6,
    "project": "./tsconfig.json",
    "sourceType": "module"
  },
  "rules": {
    "no-console": [
      "error",
      {
        "allow": [
          "warn"
        ]
      }
    ]
  }
}
