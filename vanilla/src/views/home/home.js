import {dom} from "../../madjs/assets/util/dom.js";

export {HomeController, HomeView};

/**
 * @return Readonly {HomeController}
 * @constructor
 */
const HomeController = () => {

    /**
     * @typedef HomeController
     */
    return Object.freeze({});
};

/**
 * @param rootElement
 * @param mainNavController
 * @constructor
 */
const HomeView = (rootElement, homeController) => {
    const render = () => {
        const home = dom(`home content`)

        rootElement.textContent = '';
        rootElement.appendChild(home);

        //appendFirst(rootElement)(home)
    };

    render();
};
