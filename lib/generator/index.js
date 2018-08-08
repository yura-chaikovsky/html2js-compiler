const codeGenerators = {
    ...require("./node-element"),
    ...require("./node-text"),
};

function generateCode(ast, options) {
    const variables = new Set();

    Object.assign(codeGenerators, options.generators);
    ast = options.map(ast);

    const codeLiteral = (function buildDomCreationFunction(ast, parentNodeVarName = "", level = 0) {
        const code = [];
        const varName = `el_${level}`;
        variables.add(varName);

        for (let i in ast) {
            code.push(...codeGenerators[ast[i].type](ast[i], varName, parentNodeVarName, variables, level));
            code.push(...buildDomCreationFunction(ast[i].children, varName, level + 1));
        }

        return code;
    })(ast);

    codeLiteral.unshift(`let ${Array.from(variables).join(", ")};`);

    return codeLiteral;
}

module.exports = generateCode;
