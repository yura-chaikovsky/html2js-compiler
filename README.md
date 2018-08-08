# html2js-compiler
Library for generating native DOM creation functions from HTML code. In other words, converting this:

```html
<div class="main-topic"><span>content</span></div>
```

 to this:
 
```javascript
let el_0, el_0_attr, el_1, el_2, el_3;
el_0 = document.createElement("div");
el_0_attr = document.createAttribute("class");
el_0_attr.value = "main-topic";
el_0.setAttributeNode(el_0_attr);
    el_1 = document.createElement("span");
    el_0.appendChild(el_1);
        el_2 = document.createTextNode("content");
        el_1.appendChild(el_2);
```
