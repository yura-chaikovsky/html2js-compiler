const {esc} = require("./tools");

function nodeComment(astNode, varName, parentNodeVarName, variables, level) {
    const prefix = [], suffix = [];
    // Ignore all comments by default
    // Comments are not removed on parser level to be able
    //  to add custom generator if needed.
    return {prefix, suffix, domNode: false};
}

module.exports = {
    "comment": nodeComment
};
