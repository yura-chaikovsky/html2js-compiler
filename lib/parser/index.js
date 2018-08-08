const lexer = require("./lexer");
const parser = require("./parser");
const formatter = require("./formatter");

const parseOptions = {
    ...require("./tags"),

    includePositions: false,
    stripWhitespace: true,
    removeEmptyNodes: false
};

function parse(str, options = {}) {
    Object.assign(parseOptions, options);
    const tokens = lexer(str, parseOptions);
    const nodes = parser(tokens, parseOptions);
    return formatter(nodes, parseOptions)
}

module.exports = parse;
