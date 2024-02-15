import {Suite} from "../test/test.js";
import {appendRow, clearTableRows, creatRowEntries, generateTable} from "./table.service.js";
import {dom} from "../assets/util/dom.js";

const util = Suite("table builder");

util.add("Build table", assert => {

    let mutants = [
        {name: "Name", nickname: "Nickname"},
        {name: "Donatello", nickname: "Donnie"},
        {name: "Michelangelo", nickname: "Mikey"}
    ];

    const elements = dom(`<table></table>`)
    const table = elements.childNodes[0];

    generateTable(table, mutants)
    assert.is(table.innerHTML, "<thead><tr><th>Name</th><th>Nickname</th></tr></thead><tbody><tr><td>Donatello</td><td>Donnie</td></tr><tr><td>Michelangelo</td><td>Mikey</td></tr></tbody>")
});

const cleanUpString = string => string.replaceAll(" ", "").replaceAll("\n", "");

util.add("Create new table row", assert => {

    const elements = dom(`
        <table>
            <tr>
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
        </table>`)
    const table = elements.childNodes[0];


    let [first, second, third, row] = creatRowEntries(table)
    assert.is(first.innerHTML, "");
    assert.is(second.innerHTML, "");
    assert.is(third.innerHTML, "");
    assert.is(row.childElementCount, 3)

    const expectedTable = "<table><tbody>" +
        "<tr><td>first</td><td>second</td><td>third</td></tr>" +
        "<tr><td><div></div></td><td><div></div></td><td><div></div></td></tr>" +
        "</tbody></table>";

    assert.is(cleanUpString(table.outerHTML), cleanUpString(expectedTable))
});

util.add("Add table entries", assert => {

    const elements = dom(`
        <table>
            <tr>
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
        </table>`)
    const table = elements.childNodes[0];


    let [first, second, third, row] = creatRowEntries(table)
    assert.is(first.innerHTML, "");
    assert.is(row.childElementCount, 3)

    const btn = dom('<input type="button" value="clickme">')
    const btnElement = btn.firstChild
    first.appendChild(btn);

    const expectedTable = "<table><tbody>" +
        "<tr><td>first</td><td>second</td><td>third</td></tr>" +
        "<tr><td><div>" + btnElement.outerHTML + "</div></td><td><div></div></td><td><div></div></td></tr>" +
        "</tbody></table>";

    assert.is(cleanUpString(table.outerHTML), cleanUpString(expectedTable))
});


util.add("Clear table - header remains", assert => {

    // header is the first row / tr within the table element
    const elements = dom(`
        <table>
            <tr class="header">
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
        </table>`)

    const table = elements.childNodes[0];
    const tableCopy = elements.childNodes[0];


    let [first, second, third, row] = creatRowEntries(table)

    first.innerHTML = "delete"
    second.innerHTML = "me"
    third.innerHTML = "asap"

    const expectedTable = "<table><tbody>" +
        "<tr class=\"header\"><td>first</td><td>second</td><td>third</td></tr>" +
        "<tr><td><div>delete</div></td><td><div>me</div></td><td><div>asap</div></td></tr>" +
        "</tbody></table>";

    assert.is(cleanUpString(table.outerHTML), cleanUpString(expectedTable))

    const clearedTable = clearTableRows(table);

    assert.is(cleanUpString(table.outerHTML), cleanUpString(clearedTable.outerHTML))
    assert.is(cleanUpString(tableCopy.outerHTML), cleanUpString(clearedTable.outerHTML))
});


util.add("Append table row", assert => {

    // header is the first row / tr within the table element
    const elements = dom(`
        <table>
        <tbody>
            <tr class="header">
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
        </tbody>
        </table>`)

    const table = elements.childNodes[0];

    appendRow(table)(`
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
    `);

    // or appendRow(table)(row);

    const expectedTable = `
        <table>
        <tbody>
            <tr class="header">
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </tbody>
        </table>
    `;

    assert.is(cleanUpString(table.outerHTML), cleanUpString(expectedTable))
});

util.add("Append table row - i18n", assert => {

    // header is the first row / tr within the table element
    const elements = dom(`
        <table>
        <tbody>
            <tr class="header">
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
        </tbody>
        </table>`)

    const table = elements.childNodes[0];

    appendRow(table)(`
        <tr>
            <td data-i18n="test.dom.title"></td>
            <td>2</td>
            <td>3</td>
        </tr>
    `);

    // or appendRow(table)(row);

    // we don't test async. instead of the translation, the key will be shown.
    const expectedTable = `
        <table>
        <tbody>
            <tr class="header">
                <td>first</td>
                <td>second</td>
                <td>third</td>
            </tr>
            <tr>
                <td data-i18n="test.dom.title">test.dom.title</td>
                <td>2</td>
                <td>3</td>
            </tr>
        </tbody>
        </table>
    `;

    assert.is(cleanUpString(table.outerHTML), cleanUpString(expectedTable))
});

util.add("Append table row -  ${js ``}", assert => {

    // header is the first row / tr within the table element
    const elements = dom(`
        <table>
        <tbody>
            <tr class="header">
                <td>second</td>
                <td>third</td>
            </tr>
        </tbody>
        </table>`)

    const table = elements.childNodes[0];

    const replaceMeVar = "yeyow";
    const replaceMeFnc = () => "yeyow";

    appendRow(table)(`
        <tr>
            <td>${replaceMeVar}</td>
            <td>${replaceMeFnc()}</td>
        </tr>
    `);

    const expectedTable = `
        <table>
        <tbody>
            <tr class="header">
                <td>second</td>
                <td>third</td>
            </tr>
            <tr>
                <td>yeyow</td>
                <td>yeyow</td>
            </tr>
        </tbody>
        </table>
    `;

    assert.is(cleanUpString(table.outerHTML), cleanUpString(expectedTable))
});

util.run();
