const {esc} = require("./tools");

function nodeElement(astNode, varName, parentNodeVarName, variables, level) {
    const prefix = [], suffix = [];
    const pad = ` `.repeat(4 * level);

    if (["svg", "path", "use"].includes(astNode.tagName)) {
        prefix.push(pad + `${varName} = document.createElementNS("http://www.w3.org/2000/svg", "${astNode.tagName}");`);
    } else {
        prefix.push(pad + `${varName} = document.createElement("${astNode.tagName}");`);
    }

    for (let i in astNode.attributes) {
        prefix.push(pad + `${varName}.setAttribute("${astNode.attributes[i].key}", \`${esc(astNode.attributes[i].value)}\`);`);
    }

    if (parentNodeVarName.length) {
        prefix.push(pad + `${parentNodeVarName}.appendChild(${varName});`);
    }

    return {prefix, suffix, domNode: true};
}

module.exports = {
    "element": nodeElement
};
