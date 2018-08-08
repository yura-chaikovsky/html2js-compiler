const esc = require("./generator/esc");
const parse = require("./parser/index");
const generateCode = require("./generator/index");

const options = {
    parser: {
        includePositions: false,
        stripWhitespace: true,
        removeEmptyNodes: false
    },
    compiler: {
        map: ast => ast,
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
    esc,
    compile
};
