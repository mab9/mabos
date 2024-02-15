import {dom} from "../assets/util/dom.js";
import {Menu} from "../menu/menu.js";
import {MainNavView} from "../nav/nav.js";
import {appendFirst} from "../assets/util/appends.js";

export {LayoutController, LayoutView};

/**
 * @return LayoutController
 * @constructor
 */
const LayoutController = () => {

    /**
     * @typedef {Readonly<object>} LayoutController
     */
    return Object.freeze({})
}

/**
 * @param rootElement
 * @param layoutController
 * @constructor
 */
const LayoutView = (rootElement, layoutController) => {

    const render = () => {
        const layoutElement = dom(`
            <DIV id="mainnav-section"></DIV>
            <DIV id="content-section">
                <DIV id="main-content" class="main-content">
                    I'm in the main content (overwritten by the default menu selection)
                </DIV>
            </DIV>`);

        const mainNav = layoutElement.querySelector('#mainnav-section');
        const mainContent = layoutElement.querySelector('#main-content');

        const menu = Menu(mainContent);
        MainNavView(mainNav, menu);
        appendFirst(rootElement)(layoutElement)
    };

    render();
};
