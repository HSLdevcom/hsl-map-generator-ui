module.exports = {
    parser: "@babel/eslint-parser",
    parserOptions: {
       requireConfigFile: false,
        babelOptions: {
            presets: ["@babel/preset-env"],
        },
    },

    extends: ["airbnb", "plugin:prettier/recommended"],
    rules: {
        "no-console": "off",
        "no-plusplus": ["off"],
        "react/forbid-prop-types": 0,
        "react/destructuring-assignment": 0,
        "react/prop-types": ["off"],
        "react/no-unknown-property": 0,
        "react/jsx-filename-extension": ["error", {extensions: [".js"]}],
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-boolean-value": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-wrap-multilines": 0,
        "import/first": 0,
        "prettier/prettier": 1,
        "no-underscore-dangle": 0
    },
    settings: {
        "import/resolver": "webpack"
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: ["react"]
};
