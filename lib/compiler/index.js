const codeGenerators = {
    ...require("./node-element"),
    ...require("./node-text"),
};

const generatorOptions = {
    generators: {}
};

function generateCode(ast, options) {
    const variables = new Set();

    Object.assign(generatorOptions, options);
    Object.assign(codeGenerators, generatorOptions.generators);

    const codeLiteral = (function buildDomCreationFunction(ast, parentNodeVarName = "", level = 0) {
        const code = [];
        const varName = `el_${level}`;

        if (!(ast && ast.length)) return code;
        variables.add(varName);

        for (let i in ast) {
            if (!(ast[i].type in codeGenerators)) {
                throw new Error(`Generator for node type "${ast[i].type}" is missing. Code generation failed. \n` +
                    `Make sure you passed it in compiler function: compile(html, {compiler: {generators: {"${ast[i].type}" : (ast) => { ... } } } )`);
            }

            code.push(...codeGenerators[ast[i].type](ast[i], varName, parentNodeVarName, variables, level));
            code.push(...buildDomCreationFunction(ast[i].children, varName, level + 1));
        }

        return code;
    })(ast);

    codeLiteral.unshift(`let ${Array.from(variables).join(", ")};`);

    return codeLiteral;
}

module.exports = generateCode;
