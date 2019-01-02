const {compile, esc} = require("./../lib/index");

const html = `
    <article id="main" class="main-topic">
        <repeat every="sensors" as="sensor">
            <p>
                This expression was executed, if {{ 2 + 3 }}==5.
            </p>
        </repeat>
    </article>
`.trim();

// Find in parsed AST text nodes, with tag name "repeat"
// and change their type to "repeator".
function addRepeatorNodeTypes(ast) {
    ast.forEach(node => {
        if (node.type === 'element') {
            if(node.tagName === "repeat") {
                node.type = "repeator";
            }
            addRepeatorNodeTypes(node.children);    
        }
    });

    return ast;
}



// Generate for-of statement
function repeatorGenerator(astNode, varName, parentNodeVarName, variables, level) {
    const prefix = [], suffix = [];
    const pad = ` `.repeat(4 * level);
    const iteratorsNames = {};

    astNode.attributes.forEach(({key, value}) => {
        iteratorsNames[key] = value;
    });

    prefix.push(pad + `for(let ${iteratorsNames["as"]} of ${iteratorsNames["every"]}) {`);
    suffix.push(pad + `}`);

    return {prefix, suffix};
}


const compilerOptions = {
    parser: {
        map: addRepeatorNodeTypes,
        removeEmptyNodes: true
    },
    compiler: {
        generators: {
            "repeator": repeatorGenerator
        }
    }
};

const jsCode = compile(html, compilerOptions);
console.log(jsCode);
/*
 console.log(jsCode) ==>

 el_0_attr.value = "main";
el_0.setAttributeNode(el_0_attr);
el_0_attr = document.createAttribute("class");
el_0_attr.value = "main-topic";
el_0.setAttributeNode(el_0_attr);
--> for(let sensor of sensors) {
        el_2 = document.createElement("p");
        el_1.appendChild(el_2);
            el_3 = document.createTextNode("This expression was executed, if {{ 2 + 3 }}==5.");
            el_2.appendChild(el_3);
--> }

 */