import {isFunction} from "./isfnc.js";

export {maybe, doIf}

// depricated
const maybe = cond => func => cond ? func() : ""

/*
    Shall not replace the if condition!
    doIf can be used with the ternary operator ?
    when the second expression shall not be executed.
 */

const doIf = cond => func => {
    if (cond) {
        isFunction(func) ? func() : eval(func);
    } // else do nothing
}
