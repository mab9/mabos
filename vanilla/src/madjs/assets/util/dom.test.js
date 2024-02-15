import {Suite} from "../../test/test.js"
import {dom} from "./dom.js";

const util = Suite("util-dom");

util.add("Convert to HTML element", assert => {

    const element = dom(`<h1>yeah</h1>`);
    const h1 = document.createElement("h1")

    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, h1.nodeName);
    assert.is(element.childNodes[0].innerHTML, "yeah");

});

util.add("Convert nested to HTML elements", assert => {

    const element = dom(`<div><h1>yeah</h1></div>`);

    const div = document.createElement("div")
    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, div.nodeName);
    assert.true(element.childNodes[0].innerHTML === "<h1>yeah</h1>");

    const child = element.childNodes[0];
    const h1 = document.createElement("h1")

    assert.is(child.childElementCount, 1);
    assert.is(child.childNodes[0].nodeName, h1.nodeName);
    assert.is(child.childNodes[0].innerHTML, "yeah");

    //while (element.childNodes[0]) {
    //    console.info("test", element.childNodes[0])
    //  }
});

util.add("Convert to html and do i18n", assert => {
    const key = "test.dom.title";
    const element = dom(`<div><h1 data-i18n="${key}">yeah</h1></div>`);

    // At this moment the i18n should already have changed the inner text.
    // The translation service was not initialized and therefore the default (i18n key)
    // will be displayed!

    const div = document.createElement("div")
    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, div.nodeName);
    assert.true(element.childNodes[0].innerHTML === `<h1 data-i18n="${key}">${key}</h1>`);

    const child = element.childNodes[0];
    const h1 = document.createElement("h1")

    assert.is(child.childElementCount, 1);
    assert.is(child.childNodes[0].nodeName, h1.nodeName);
    assert.is(child.childNodes[0].innerHTML, key);
});

util.add("Convert to html table", assert => {
    const key = "test.dom.title";
    const element = dom(`
        <table>
            <thead><tr><th data-i18n="${key}">1</th></tr></thead>
            <tbody><tr><td>2</td></tr></tbody>
        </table>
    `);

    const table = document.createElement("table")
    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, table.nodeName);

    const thead = element.querySelector("thead")

    // dom can't parse table elements!
    thead.firstChild.appendChild(dom('<th>Empty</th>'))

    assert.is(thead.innerText, key + "Empty")

});

util.add("Convert to html class test", assert => {
    const html = dom(`<div class="fancy"></div>`);
    const element = html.querySelector("div");
    element.className = "fancy";

    const classes = element.classList;
    assert.is(classes.length, 1)
    assert.is(classes[0], "fancy")
});

util.run();
