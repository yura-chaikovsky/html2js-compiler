const tootls = require("./compiler/tools");
const parse = require("./parser/index");
const generateCode = require("./compiler/index");

const options = {
    parser: {
        includePositions: false,
        stripWhitespace: true,
        removeEmptyNodes: false,
        map: ast => ast,
    },
    compiler: {
        generators: {}
    }
};

function compile(htmlString, optionsOverrides) {
    Object.assign(options, optionsOverrides);

    const ast = parse(htmlString, options.parser);
    const jsCode = generateCode(ast, options.compiler);

    return jsCode.join("\n");
}

module.exports = {
    compile,
    ...tootls
};
