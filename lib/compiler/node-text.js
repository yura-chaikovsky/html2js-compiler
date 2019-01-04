const {esc} = require("./tools");

function nodeText(astNode, varName, parentNodeVarName, variables, level) {
    const prefix = [], suffix = [];
    const pad = ` `.repeat(4 * level);

    prefix.push(pad + `${varName} = document.createTextNode(\`${esc(astNode.content)}\`);`);

    if (parentNodeVarName.length) {
        prefix.push(pad + `${parentNodeVarName}.appendChild(${varName});`);
    }

    return {prefix, suffix, domNode: true};
}

module.exports = {
    "text": nodeText
};
