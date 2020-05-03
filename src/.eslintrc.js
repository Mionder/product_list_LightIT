module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        'no-unused-vars': [1],
        'brace-style': [2, '1tbs'],
        'indent': [2, 4],
        'linebreak-style': ["error", "windows"],
        'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }]
    },
    "parser" : "babel-eslint"
};