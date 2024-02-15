import {
    EDITABLE,
    presentationModelFromAttributeNames,
    setValueOf,
} from "../../madjs/base/presentationModel/presentationModel.js";

export { Abo, ALL_PERSON_ATTRIBUTE_NAMES}

/**
 * @typedef Person
 * @type     {object}
 * @property {!number} id        - unique integer number; mandatory.
 * @property {?string} img       - path to an image that displays the developer; optional.
 * @property {string}  firstname - might be empty.
 * @property {string}  lastname  - might be empty.
 * @property {string}  email     - might be empty.
 * @property {boolean} joined   - might be empty.
 * @property {array}  roles      - might be empty.
 * @example  {id:0, img:"../assets/img/avatars/018-gentleman.svg", firstname: "Marc-Antoine", lastname: "Bruelhart"}
 */

const ALL_PERSON_ATTRIBUTE_NAMES = ['id', 'img', 'firstname', 'lastname', 'email', 'joined', 'isAdmin', 'isSpacer', 'isApprover'];

const Abo = () => {      // facade
    const abo = presentationModelFromAttributeNames(ALL_PERSON_ATTRIBUTE_NAMES);

    // set empty job attribute to be able to use the converter and validator functions
    setValueOf(abo.email)("");
    //person.email.setConverter(input => input.toUpperCase());
    abo.email.setValidator(input => input.indexOf("@") >= 0);
    abo.joined.getObs(EDITABLE).setValue(false);
    return abo;
}

// joined attribute true, wenn user eingeladen wurde und sich angemledet hat.


// funktion person einladen, joined boolean
// email property
// gruppen zugehörigkeit? nö direkt auf gruppe selbst ausführen.
// rollen employee, admin, spacer (space owner), approver // ohne employee? denn employee sind ehh alle?
