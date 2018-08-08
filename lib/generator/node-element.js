const {esc} = require("./esc");

function nodeElement(astNode, varName, parentNodeVarName, variables, level) {
    const code = [];
    const pad = ` `.repeat(4 * level);

    code.push(pad + `${varName} = document.createElement("${astNode.tagName}");`);
    for (let i in astNode.attributes) {
        const attrName = `${varName}_attr`;
        variables.add(attrName);

        code.push(pad + `${attrName} = document.createAttribute("${astNode.attributes[i].key}");`);
        code.push(pad + `${attrName}.value = "${esc(astNode.attributes[i].value)}";`);
        code.push(pad + `${varName}.setAttributeNode(${attrName});`);
    }

    if (parentNodeVarName.length) {
        code.push(pad + `${parentNodeVarName}.appendChild(${varName});`);
    }

    return code;
}

module.exports = {
    "element": nodeElement
};
