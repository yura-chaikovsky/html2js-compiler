const {esc} = require("./tools");

function nodeElement(astNode, varName, parentNodeVarName, variables, level) {
    const prefix = [], suffix = [];
    const pad = ` `.repeat(4 * level);

    prefix.push(pad + `${varName} = document.createElement("${astNode.tagName}");`);
    for (let i in astNode.attributes) {
        const attrName = `${varName}_attr`;
        variables.add(attrName);

        prefix.push(pad + `${attrName} = document.createAttribute("${astNode.attributes[i].key}");`);
        prefix.push(pad + `${attrName}.value = \`${esc(astNode.attributes[i].value)}\`;`);
        prefix.push(pad + `${varName}.setAttributeNode(${attrName});`);
    }

    if (parentNodeVarName.length) {
        prefix.push(pad + `${parentNodeVarName}.appendChild(${varName});`);
    }

    return {prefix, suffix, domNode: true};
}

module.exports = {
    "element": nodeElement
};
