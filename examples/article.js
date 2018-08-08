const {compile} = require("./../lib/index");

const html = `
    <article id="main" class="main-topic">
        <p>
            Information technology is the use of 
            <a href="https://en.wikipedia.org/wiki/Computer" title="Computer">computers</a> 
            to store, retrieve, transmit, and manipulate data, or information, often in the context of 
            a business or other enterprise. IT is considered to be a subset of 
            <a href="https://en.wikipedia.org/wiki/Information_and_communications_technology" 
               title="Information and communications technology">information and communications technology</a> (ICT).
        </p>
    </article>
`.trim();

const jsCode = compile(html);

console.log(jsCode);