export {appendFirst, appendReplacing, appendsStyle}

const appendFirst = rootElement => newElements => {
    rootElement.firstChild
        ? rootElement.firstChild.replaceWith(newElements)
        : rootElement.appendChild(newElements);
}

const appendReplacing = rootElement => newElements => {
    while (rootElement.hasChildNodes()) {
        rootElement.removeChild(rootElement.firstChild);
    }
    rootElement.appendChild(newElements);
}


const appendsStyle = pageCss => {
    const style = document.createElement("STYLE");

    // style element is needed to activate the syntax highlighting
    pageCss = pageCss.replace('<style>', '').replace('</style>','');
    style.innerHTML = pageCss;
    document.head.appendChild(style);
}
