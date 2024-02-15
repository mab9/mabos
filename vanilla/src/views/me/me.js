import {dom} from "../../assets/util/dom.js";

export {MeController, MeView};

/**
 * @return Readonly {MeController}
 * @constructor
 */
const MeController = () => {

    /**
     * @typedef MeController
     */
    return Object.freeze({});
};

/**
 * @param rootElement {Element}
 * @param meController {MeController}
 * @constructor
 */
const MeView = (rootElement, meController) => {
    const render = () => {
        const me = dom(`Me content`)

        rootElement.textContent = '';
        rootElement.appendChild(me);

        //appendFirst(rootElement)(home)
    };

    render();
};
