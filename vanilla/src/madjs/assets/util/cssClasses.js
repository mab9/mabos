import {appendsStyle} from "./appends.js";

export {saveClassRemoval, addClass, styleElement,
addClassNoSelection, saveClassRemovalNoSelection}

const noSelection = 'no-selection'

const addClass = elements => clazz => {
    if (!HTMLCollection.prototype.isPrototypeOf(elements) && !NodeList.prototype.isPrototypeOf(elements)) {
        elements.classList.add(clazz);
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add(clazz);
        }
    }
}

appendsStyle(`.no-selection { user-select: none; }`)

const addClassNoSelection = element => addClass(element)(noSelection)
const saveClassRemovalNoSelection = element => saveClassRemoval(element)(noSelection)

const saveClassRemoval = elements => clazz => {
    if (!HTMLCollection.prototype.isPrototypeOf(elements) && !NodeList.prototype.isPrototypeOf(elements)) {
        if (elements.classList.contains(clazz)) {
            elements.classList.remove(clazz);
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains(clazz)) {
                elements[i].classList.remove(clazz);
            }
        }
    }
}


const styleElement = add => clazz => element => {
    add
        ? addClass(element)(clazz)
        : saveClassRemoval(element)(clazz);
}
