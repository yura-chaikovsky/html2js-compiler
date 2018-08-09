const lexer = require("./lexer");
const parser = require("./parser");
const formatter = require("./formatter");

const parserOptions = {
    ...require("./tags"),

    includePositions: false,
    stripWhitespace: true,
    removeEmptyNodes: false,

    map: ast => ast
};

function parse(str, options = {}) {
    Object.assign(parserOptions, options);
    const tokens = lexer(str, parserOptions);
    const nodes = parser(tokens, parserOptions);
    const ast = formatter(nodes, parserOptions);
    return parserOptions.map(ast);
}

module.exports = parse;
