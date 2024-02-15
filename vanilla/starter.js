import {LayoutController, LayoutView} from "./src/layout/layout.js";
import {dom} from "./src/assets/util/dom.js";
import {LandingView} from "./src/landing/landing.view.js";

export {start} ;

const start = (appRootId, authenticated) => {

    const CONTENT_WRAPPER = 'root';
    const layoutController = LayoutController();

    // todo: think about resetting the model world on a possible re-render
    const root = document.getElementById(CONTENT_WRAPPER)
    const mabos = dom(`<div id="${appRootId}">`);

    if (authenticated) {
        LayoutView(mabos, layoutController);
        root.replaceWith(mabos); // why replace???
    } else {
        console.info("root", root)
        LandingView(root);
    }
}
