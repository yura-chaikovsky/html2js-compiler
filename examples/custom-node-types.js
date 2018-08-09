const {compile, esc} = require("./../lib/index");

const html = `
    <article id="main" class="main-topic">
        <p>
            This expression was executed, if {{ 2 + 3 }}==5.
        </p>
    </article>
`.trim();

// Find in parsed AST text nodes, that contains "{{" and  "}}"
// and change their type to "text-with-expression".
function addExpressionNodeTypes(ast) {
    const expressionRegExp = /{{.+?}}/;

    ast.forEach(node => {
        if (node.type === 'element') {
            addExpressionNodeTypes(node.children);
        } else {
            if (expressionRegExp.test(node.content)) {
                node.type = "text-with-expression";
            }
        }
    });

    // console.log(JSON.stringify(ast, null, 4));
    return ast;
}


// Generate content of text node with expression.
// e.g. "if {{ 2 + 3 }}==5" will be compiled to "if " + ( 2 + 3 ) "==5"
function textWithExpressionGenerator(astNode, varName, parentNodeVarName, variables, level) {
    const code = [];
    const pad = ` `.repeat(4 * level);
    const expressionRegExp = /{{(.+?)}}/;

    const nodeContent = astNode.content.split(expressionRegExp).reduce((code, content, i) => {
        // Odd elements are expressions, evens - strings
        code.push((i % 2) ? `(${content})` : `"${esc(content)}"`);
        return code;
    }, []).join(` + `);

    code.push(pad + `${varName} = document.createTextNode(${nodeContent});`);

    if (parentNodeVarName.length) {
        code.push(pad + `${parentNodeVarName}.appendChild(${varName});`);
    }

    return code;
}


const compilerOptions = {
    parser: {
        map: addExpressionNodeTypes,
        removeEmptyNodes: true
    },
    compiler: {
        generators: {
            "text-with-expression": textWithExpressionGenerator
        }
    }
};

const jsCode = compile(html, compilerOptions);

console.log(jsCode);
/***
 console.log(jsCode) ==>


 let el_0, el_0_attr, el_1, el_2, el_3;
 el_0 = document.createElement("article");
 el_0_attr = document.createAttribute("id");
 el_0_attr.value = "main";
 el_0.setAttributeNode(el_0_attr);
 el_0_attr = document.createAttribute("class");
 el_0_attr.value = "main-topic";
 el_0.setAttributeNode(el_0_attr);
 el_1 = document.createElement("p");
 el_0.appendChild(el_1);
 -->       el_2 = document.createTextNode("This expression was executed, if " + ( 2 + 3 ) + "==5.");
 el_1.appendChild(el_2);

 ***/