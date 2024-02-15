import {ListController, SelectionController} from "../../madjs/base/controller/controller.js";
import {ALL_PERSON_ATTRIBUTE_NAMES, Abo} from "./abo.model.js";
import {personService} from "./person.service.local.js";
import {id} from "../../madjs/assets/church/church.js";
import {VALUE} from "../../madjs/base/presentationModel/presentationModel.js";

export { HomeController }

/**
 * @return Readonly {HomeController}
 * @constructor
 */
const HomeController = () => {
    const listController = ListController();
    const selectionController = SelectionController(NoPerson);

    const getListController      = () => listController;
    const getSelectionController = () => selectionController;

    /** @param {Person} personData */
    const addPerson = personData => {
        const person = Abo();

        ALL_PERSON_ATTRIBUTE_NAMES.forEach(attribute => {
            person[attribute].getObs(VALUE).setValue(personData[attribute]);
        })

        listController.addModel(person);
    };

    const initPersons = () => personService().loadPersons(id).forEach(person => addPerson(person))

    /**
     * @typedef PersonController
     */
    return Object.freeze({
        getListController : getListController,
        getSelectionCtrl : getSelectionController,
        addPerson: addPerson,
        initPersons: initPersons,
    });
};

const NoPerson = (() => { // one time creation, singleton
    const johnDoe = Abo();
    ALL_PERSON_ATTRIBUTE_NAMES.forEach(name => johnDoe[name].setConvertedValue(""));
    return johnDoe;
})();
