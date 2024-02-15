import {LayoutController, LayoutView} from "./src/madjs/layout/layout.js";
import {dom} from "./src/madjs/assets/util/dom.js";
import {LandingView} from "./src/views/landing/landing.view.js";
import {appendReplacing} from "./src/madjs/assets/util/appends.js";

export {start} ;

const start = (appRootId, authenticated) => {

    const CONTENT_WRAPPER = 'root';
    const layoutController = LayoutController();

    // todo: think about resetting the model world on a possible re-render
    const rootElement = document.getElementById(CONTENT_WRAPPER)
    const containerElement = dom(`<div id="${appRootId}">`);

    if (authenticated) {
        LayoutView(containerElement, layoutController);
        appendReplacing(rootElement)(containerElement)
    } else {
        LandingView(rootElement);
    }
}
