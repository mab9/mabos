import {appendFirst} from "../../assets/util/appends.js";
import {dom} from "../../assets/util/dom.js";
import {formItemProjector, inputProjector} from "../../projector/form.projector.js";

export { listItemProjector, formProjector, pageCss }

const masterClassName = 'instant-update-master'; // should be unique for this projector
const detailClassName = 'instant-update-detail';

const listItemProjector = (masterController, selectionController, rootElement, model, attributeNames) => {

    const modelDetails = personModelDetails(model); // init model

    if(rootElement.style['grid-template-columns'] === '') {
        rootElement.classList.add(masterClassName);
        const columStyle = '1.7em '+ attributeNames.map(x=>'auto').join(' ');
        rootElement.style['grid-template-columns'] = columStyle;
    }

    const deleteButton      = document.createElement("Button");
    deleteButton.setAttribute("class","delete");
    deleteButton.innerHTML  = "&times;";
    deleteButton.onclick    = _ => masterController.removeModel(model);

    const inputElements = [];

    attributeNames.forEach( attributeName => {
        const inputElement = inputProjector(attributeName)(modelDetails);
        inputElement.onfocus = _ => selectionController.setSelectedModel(model);
        inputElements.push(inputElement);
    });

    selectionController.onModelSelected(
        selected => selected === model
          ? deleteButton.classList.add("selected")
          : deleteButton.classList.remove("selected")
    );

    masterController.onModelRemove( (removedModel, removeMe) => {
        if (removedModel !== model) return;
        rootElement.removeChild(deleteButton);
        inputElements.forEach( inputElement => rootElement.removeChild(inputElement));
        selectionController.clearSelection();
        removeMe();
    } );

    rootElement.appendChild(deleteButton);
    inputElements.forEach( inputElement => rootElement.appendChild(inputElement));
    selectionController.setSelectedModel(model);
};

const personModelDetails = item => {
    return {
        model: item,
        id: ["view.person.detail.label.id", "text"],
        img: ["view.person.detail.label.img", "img"],
        firstname: ["view.person.detail.label.firstname", "text"],
        lastname: ["view.person.detail.label.lastname", "text"],
        email: ["view.person.detail.label.email", "text"],
        joined: ["view.person.detail.label.joined", "checkbox"],
        isAdmin: ["view.person.detail.label.roles.admin", "checkbox"],
        isApprover: ["view.person.detail.label.roles.approver", "checkbox"],
        isSpacer: ["view.person.detail.label.roles.spacer", "checkbox"],
    }
}

const formProjector = (detailController, rootElement, model, attributeNames) => {

    const modelDetails = personModelDetails(model); // init model

    const detailElement = dom(`
        <FORM style="width: 35%; margin-bottom: 20px; font-size: larger;">
            <DIV class="${detailClassName}">
            </DIV>
        </FORM>
    `)

    const detailFormElement = detailElement.querySelector("." + detailClassName);

    attributeNames.forEach(attributeName => {
           formItemProjector(detailFormElement, attributeName, modelDetails);
    });

    appendFirst(rootElement)(detailFormElement);
};


const pageCss = `
    .${masterClassName} {
        display:        grid;
        grid-column-gap: 0.5em;
        grid-template-columns: 1.7em auto auto; /* default: to be overridden dynamically */
        margin-bottom:  0.5em ;
    }
    .${detailClassName} {
        display:        grid;
        grid-column-gap: 0.5em;
        grid-template-columns: 1fr 3fr;
        margin-bottom:  0.5em ;
    }

    img {
        width: 40px;
    }
`;
