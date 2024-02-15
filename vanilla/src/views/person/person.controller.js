import {ListController, SelectionController} from "../../base/controller/controller.js";
import {ALL_PERSON_ATTRIBUTE_NAMES, Person} from "./person.model.js";
import {personService} from "./person.service.local.js";
import {id} from "../../assets/church/church.js";
import {VALUE} from "../../base/presentationModel/presentationModel.js";

export { PersonController }

/**
 * @return Readonly {PersonController}
 * @constructor
 */
const PersonController = () => {
    const listController = ListController();
    const selectionController = SelectionController(NoPerson);

    const getListController      = () => listController;
    const getSelectionController = () => selectionController;

    /** @param {Person} personData */
    const addPerson = personData => {
        const person = Person();

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
    const johnDoe = Person();
    ALL_PERSON_ATTRIBUTE_NAMES.forEach(name => johnDoe[name].setConvertedValue(""));
    return johnDoe;
})();
