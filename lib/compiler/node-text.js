const {esc} = require("./tools");

function nodeText(astNode, varName, parentNodeVarName, variables, level) {
    const code = [];
    const pad = ` `.repeat(4 * level);

    code.push(pad + `${varName} = document.createTextNode("${esc(astNode.content)}");`);

    if (parentNodeVarName.length) {
        code.push(pad + `${parentNodeVarName}.appendChild(${varName});`);
    }

    return code;
}

module.exports = {
    "text": nodeText
};
