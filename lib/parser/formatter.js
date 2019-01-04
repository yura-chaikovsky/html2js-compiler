function splitHead(str, sep) {
    const idx = str.indexOf(sep);
    if (idx === -1) return [str];
    return [str.slice(0, idx), str.slice(idx + sep.length)]
}

function unquote(str) {
    const car = str.charAt(0);
    const end = str.length - 1;
    const isQuoteStart = car === '"' || car === "'";
    if (isQuoteStart && car === str.charAt(end)) {
        return str.slice(1, end)
    }
    return str
}

function removeEmptyNodes(nodes) {
    return nodes.filter(node => {
        if (node.type === 'element') {
            node.children = removeEmptyNodes(node.children);
            return true
        }
        return node.content.length
    })
}

function stripWhitespace(nodes) {
    return nodes.map(node => {
        if (node.type === 'element') {
            node.children = stripWhitespace(node.children)
        } else {
            node.content = node.content.trim()
        }
        return node
    })
}

function formatAttributes(attributes) {
    return attributes.map(attribute => {
        const parts = splitHead(attribute.trim(), '=');
        const key = parts[0];
        const value = typeof parts[1] === 'string'
            ? unquote(parts[1])
            : null;
        return {key, value}
    })
}

function formatter(nodes, options) {
    nodes = nodes.map(node => {
        const type = node.type;
        const outputNode = type === 'element'
            ? {
                type,
                name: node.tagName,
                tagName: node.tagName.toLowerCase(),
                attributes: formatAttributes(node.attributes),
                children: formatter(node.children, options)
            }
            : {type, content: node.content};
        if (options.includePositions) {
            outputNode.position = node.position
        }
        return outputNode
    });

    if (options.stripWhitespace) {
        nodes = stripWhitespace(nodes);
    }

    if (options.removeEmptyNodes) {
        nodes = removeEmptyNodes(nodes);
    }

    return nodes;
}

module.exports = formatter;
