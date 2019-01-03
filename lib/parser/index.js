const lexer = require("./lexer");
const parser = require("./parser");
const formatter = require("./formatter");

const parserOptions = {
    ...require("./tags"),

    includePositions: false,
    stripWhitespace: true,
    removeEmptyNodes: false,

    maps: []
};

function parse(str, options = {}) {
    Object.assign(parserOptions, options);
    const tokens = lexer(str, parserOptions);
    const nodes = parser(tokens, parserOptions);
    const ast = formatter(nodes, parserOptions);
    return parserOptions.maps.reduce((ast, map) => map(ast), ast);
}

module.exports = parse;
