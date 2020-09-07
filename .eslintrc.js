module.exports = {
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    extends: ["airbnb", "plugin:prettier/recommended"],
    rules: {
        "no-console": "off",
        "no-plusplus": ["off"],
        "react/prop-types": ["off"],
        "react/jsx-filename-extension": ["error", {extensions: [".js"]}],
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-boolean-value": 0,
        "import/first": 0,
        "prettier/prettier": 1
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
