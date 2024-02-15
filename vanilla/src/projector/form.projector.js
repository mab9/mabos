import {
    EDITABLE,
    LABEL,
    setValueOf,
    toggleClick,
    VALID,
    VALUE,
    valueOf
} from "../base/presentationModel/presentationModel.js";
import {i18n} from "../service/translation.service.js";

export {bindInput, formItemProjector, inputProjector, inputProjectorFixedValue, labelProjector}

const MODEL_DETAIL_LABEL = 0;
const MODEL_DETAIL_INPUT_TYPE = 1;

const bindInput = (attribute, inputElement) => {
    if (inputElement.type === "checkbox") {
        inputElement.oninput = _ => setValueOf(attribute)(inputElement.checked);
    } else {
        inputElement.oninput = _ => attribute.setConvertedValue(inputElement.value);
    }

    if (inputElement.type === "button") {
        inputElement.onclick = () => toggleClick(attribute);
    }

    attribute.getObs(VALUE).onChange(text => {
        inputElement.value = text
        inputElement.checked = text;
    });

    // init at least
    inputElement.value = valueOf(attribute);
    inputElement.checked = valueOf(attribute);

    attribute.getObs(VALID, true).onChange(
        valid => valid
            ? inputElement.classList.remove("invalid")
            : inputElement.classList.add("invalid")
    );

    attribute.getObs(EDITABLE, true).onChange(isEditable => {
            if (isEditable) {
                inputElement.removeAttribute("readonly");
                inputElement.disabled = false;
            } else {
                inputElement.setAttribute("readonly", true)
                inputElement.disabled = true;
            }
        }
    )

    attribute.getObs(LABEL, '').onChange(label => inputElement.setAttribute("title", label));
};

// todo rename to generic form value projector
const inputProjector = attributeName => attributeDetails => {

    const attribute = attributeDetails.model[attributeName];
    const inputType = attributeDetails[attributeName][MODEL_DETAIL_INPUT_TYPE];
    const label = attributeDetails[attributeName][MODEL_DETAIL_LABEL];

    if (inputType === "img") {
        const element = document.createElement("IMG");
        element.src = valueOf(attribute);
        return element;
    } else {
        const element = document.createElement("INPUT");
        element.type = inputType;
        element.size = 20;
        bindInput(attribute, element);

        if (inputType === "button") {
            i18n(label)(element);
        }
        return element;
    }
};

const inputProjectorFixedValue = value => attributeName => attributeDetails => {

    const attribute = attributeDetails.model[attributeName];
    const inputType = attributeDetails[attributeName][MODEL_DETAIL_INPUT_TYPE];
    const element = document.createElement("INPUT");

    element.type = inputType;
    element.size = 20;
    element.value = value;

    attribute.getObs(EDITABLE, true).onChange(isEditable => {
            if (isEditable) {
                element.removeAttribute("readonly");
                element.disabled = false;
            } else {
                element.setAttribute("readonly", true)
                element.disabled = true;
            }
        }
    )

    return element;
};

const labelProjector = attributeName => attributeDetails => {

    const value = attributeDetails[attributeName][MODEL_DETAIL_LABEL];
    const element = document.createElement("LABEL");

    element.setAttribute("for", attributeName);

    i18n(value)(element);
    return element;
}

const formItemProjector = (rootElement, attributeName, modelDetails) => {
    rootElement.appendChild(labelProjector(attributeName)(modelDetails));
    rootElement.appendChild(inputProjector(attributeName)(modelDetails));
}
