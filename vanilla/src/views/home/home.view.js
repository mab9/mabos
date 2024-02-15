import {appendFirst} from "../../madjs/assets/util/appends.js";
import {dom} from "../../madjs/assets/util/dom.js";
import {formProjector, listItemProjector, pageCss} from "./instantUpdateProjector.js";
import {ALL_PERSON_ATTRIBUTE_NAMES, Abo} from "./abo.model.js";
import {setValueOf} from "../../madjs/base/presentationModel/presentationModel.js";

export {HomeView};

// page-style change, only executed once
const style = document.createElement("STYLE");
style.innerHTML = pageCss;
document.head.appendChild(style);


/**
 * @param rootElement
 * @param  mainController {HomeController}
 * @constructor
 */
const HomeView = (rootElement, mainController) => {

    const listController = mainController.getListController();
    const selectionController = mainController.getSelectionCtrl();

    const render = () => {
        const person = dom(`
            <div class="card">
                <h1 data-i18n="view.person.card.master.title"></h1>
                <div class="holder">
                    <button id="plus" autofocus> invite </button>
                    <input  id="email" type="text" placeholder="mab9@mab.rock" autofocus>
                    <div    id="masterContainer"></div>
                </div>
            </div>

            <div class="card">
                <h1 data-i18n="view.person.card.details.title"></h1>
                <div class="holder" id="detailContainer"></div>
            </div>
        `)

        const masterContainer = person.querySelector("#masterContainer");
        const detailContainer = person.querySelector("#detailContainer");
        const plus = person.querySelector("#plus");
        const email = person.querySelector("#email");  // todo impl multiple emails "e1;e2;..."

        MasterView(listController, selectionController, masterContainer);
        DetailView(selectionController, detailContainer);

        rootElement.textContent = '';
        appendFirst(rootElement)(person)
    };

    render();
    mainController.initPersons();
};

const MasterView = (listController, selectionController, rootElement) => {

    const render = person => listItemProjector(listController, selectionController, rootElement,
        person, ['firstname', 'lastname']);

    // binding
    listController.onModelAdd(render);
};

const DetailView = (selectionController, rootElement) => {
    const render = person => formProjector(selectionController, rootElement, person, ALL_PERSON_ATTRIBUTE_NAMES.filter(item => item !== "id"));
    selectionController.onModelSelected(render);
};
