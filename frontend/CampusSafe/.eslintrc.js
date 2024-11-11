module.exports = {
    extends: ["expo", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "off",
            {
                endOfLine: "auto",
            },
        ],
        "import/no-unresolved": [0, { caseSensitive: false }],
    },
};
