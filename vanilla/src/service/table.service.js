import {i18n} from "./translation.service.js";
import {Attribute, onValueChange, setValueOf} from "../base/presentationModel/presentationModel.js";
import {styleElement} from "../assets/util/cssClasses.js";

export {generateTable, creatRowEntries, clearTableRows, bindTableSearchListener, appendRow, addRowHovering}

// todo add i18n
const generateTableHead = (table, data) => {
    const keys = Object.keys(data)
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of keys) {
        let th = document.createElement("th");
        let text = document.createTextNode(data[key]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

const generateTable = (table, data) => {
    // the first row is used to define the header
    generateTableHead(table, data[0])
    data.splice(0, 1) // remove header row
    const tbody = table.createTBody();
    for (let element of data) {
        let row = tbody.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}


const appendRow = table => row => {
    // const tbody = table.children[0];
    // const thead = tbody.childNodes[0];
    const tr = document.createElement("TR");
    tr.innerHTML = row;

    // i18n translation
    const nodes = tr.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
        const key = node.dataset.i18n;
        i18n(key)(node);
    })

    table.children[0].appendChild(tr)
    return tr;
}

const addRowHovering = row => fnc => {
    const isHoverOnRow = Attribute(false)
    row.onmouseover = _ => setValueOf(isHoverOnRow)(true);
    row.onmouseleave = _ => setValueOf(isHoverOnRow)(false);

    onValueChange(isHoverOnRow)(isHovered => {
        styleElement(isHovered)("row-hovering")(row); // style row on hover
        fnc(isHovered)
    });
}


const creatRowEntries = table => {  // todo add guards (has head, has columns,...)
    const tbody = table.children[0];
    const thead = tbody.childNodes[0];
    const columns = tbody.childNodes[0].cells;

    let row = tbody.insertRow();

    let entries = [];

    for (let i = 0; i < columns.length; i++) {
        let cell = row.insertCell();
        let element = document.createElement("div");
        cell.appendChild(element);
        entries[entries.length] = element;
    }
    entries[entries.length] = row;  // append row to add row manipulations
    return entries;
}

// fast row removal without considering memory
const clearTableRows = table => {
    // const tbody = table.children[0];
    // const thead = tbody.childNodes[0];
    table.children[0].innerHTML = table.children[0].childNodes[0].outerHTML;
    return table;
}

const bindTableSearchListener = table => search => column => {
    search.onkeyup = () => {
        // Declare variables
        let filter, tr, td, i, txtValue;
        filter = search.value.toUpperCase();
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[column];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

