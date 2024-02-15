import {Observable} from "../observable/observable.js";
import {id} from "../../assets/church/church.js";
import {isFunction} from "../../assets/util/isfnc.js";

export {
    Attribute, presentationModelFromAttributeNames,
    VALID, VALUE, EDITABLE, LABEL, HOVER, CLICK,
    valueOf, setValueOf, onValueChange,
    labelOf, setLabelOf, onLabelChange,
    hoverOf, setHoverOf, onHoverChange,
    sizeOf, forEach, toggleClick, onClick,
}

const VALUE = "value";
const VALID = "valid";
const EDITABLE = "editable";
const LABEL = "label";
const HOVER = "hover"
const CLICK = "click"


/**
 * @return Readonly {Attribute}
 * @constructor
 * @param value {String}
 */
const Attribute = value => {

    const observables = {};

    const hasObs = name => observables.hasOwnProperty(name);

    const getObs = (name, initValue = null) =>
        hasObs(name)
            ? observables[name]
            : observables[name] = Observable(initValue);

    getObs(VALUE, value); // initialize the value at least
    getObs(CLICK, false); // initialize click value to toggle it

    let   convert           = id ;
    const setConverter      = converter => {
        convert = converter;
        setConvertedValue(getObs(VALUE).getValue());
    };
    const setConvertedValue = val => getObs(VALUE).setValue(convert(val));

    // todo: this might set many validators without discharging old ones
    const setValidator = validate => getObs(VALUE).onChange(val => getObs(VALID).setValue(validate(val)));

    /**
     * @typedef Attribute
     */
    return Object.freeze({getObs, hasObs, setValidator, setConverter, setConvertedValue})
};

/** Convenience function to read the current state of the attribute's property observable for the given attribute. */
const valueOf = attribute => attribute.getObs(VALUE).getValue();
const labelOf = attribute => attribute.getObs(LABEL).getValue();
const hoverOf = attribute => attribute.getObs(HOVER).getValue();

// utils for listController values
const sizeOf = attribute => valueOf(attribute).size();
const forEach = attribute => fnc => valueOf(attribute).getAll().forEach(item => fnc(item));

const toggleClick = attribute => attribute.getObs(CLICK).setValue(!attribute.getObs(CLICK).getValue())

/** Convenience function to write the state of the attribute's property observable for the given attribute. */
const setValueOf = attribute => value => attribute.getObs(VALUE).setValue(value)
const setLabelOf = attribute => value => attribute.getObs(LABEL).setValue(value)
const setHoverOf = attribute => value => attribute.getObs(HOVER).setValue(value)


const expressionMaker = attribute => fnc => attributeType => {
    isFunction(fnc)
        ? attribute.getObs(attributeType).onChange(value => fnc(value))
        : attribute.getObs(attributeType).onChange(_ => fnc())
}

/** Convenience function to add on change listeners to the attribute's property observable for the given attribute. */
const onValueChange = attribute => fnc => expressionMaker(attribute)(fnc)(VALUE);
const onLabelChange = attribute => fnc => expressionMaker(attribute)(fnc)(LABEL);
const onHoverChange = attribute => fnc => expressionMaker(attribute)(fnc)(HOVER);
const onClick = attribute => fnc => expressionMaker(attribute)(fnc)(CLICK);

/** Creates Presentation Model with Attributes for each attribute name with VALUE and LABEL observables. */
const presentationModelFromAttributeNames = attributeNames => {
    const result = Object.create(null);
    attributeNames.forEach(attributeName => {
        const attribute = Attribute(undefined);
        attribute.getObs(LABEL).setValue(attributeName); // default: use the attribute name as the label
        result[attributeName] = attribute;
    });
    return result;
};
