const {compile} = require("./../lib/index");

const html = `<div class="main-topic"><span>content</span></div>`;

const jsCode = compile(html);

console.log(jsCode);