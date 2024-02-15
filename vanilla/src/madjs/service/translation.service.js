import {config} from "../../../config.js";
import {Observable} from "../base/observable/observable.js";
import {doIf} from "../assets/util/maybe.js";

export {i18n, I18N_CURRENT_LANG} // See export at the bottom of the file!

const I18N_CURRENT_LANG = 'TRANSLATION_CURRENT_LANGUAGE';

/**
 * @typedef i18n
 * @type     {function}              - function to provide a small api for translations
 * @param {!key} key                 - the i18n key that is defined in a language json file
 * @param {!destination} destination - the html element where the translation is rendered into
 */
const i18n = (key) => (destination) => {
    if (!key) {     // guard
        console.error('No translation key provided ლ(ಠ_ಠლ)');
        return 'no.i18n.key.provided';
    }

    const callback = (translation) => {
        destination.type === 'button'
            ? destination.value = translation
            : destination.innerText = translation;
    }

    translationService.translate(key, callback);
};

/**
 * @constructor
 * @returns {TranslationService}
 */
const TranslationService = () => {
    let isInitialized = false;
    let langTranslations = {};
    const isLangLoaded = Observable(false);

    const currentLang = Observable(
        localStorage.getItem(I18N_CURRENT_LANG)
            ? localStorage.getItem(I18N_CURRENT_LANG)
            : config.lang);

    const loadCurrentLang = () => {
        const lang = currentLang.getValue();
        isLangLoaded.setValue(false);

        fetch("src/assets/i18n/" + lang + ".json")
        .then(response => response.json())
        .then(json => {
            langTranslations = json;
            isLangLoaded.setValue(true);
        })
    }

    currentLang.onChange(lang => {
        localStorage.setItem(I18N_CURRENT_LANG, lang);
        if (isInitialized) {
            loadCurrentLang();
        }
    });

    const resolveKey = (key) => {
        // default if no lang is loaded
        if (!Object.keys(langTranslations).length) {
            return key;
        }

        const translation = langTranslations[key]
        if (!translation) {
            console.warn('No translation found ¯\\_(ツ)_/¯ for key: ', key);
            return key
        }
        return translation;
    };

    const resolveCallback = (callback, languageReady, key) => doIf(languageReady)(callback(resolveKey(key)));

    // Translate languages without page refresh
    const translate = (key, callback) => {
        isLangLoaded.onChange( value => resolveCallback(callback, value, key));
        resolveCallback(callback, isLangLoaded.getValue(), key);
    }

    // is used to prevent to load the current lang
    // via the currentLang.onChange definition
    const init = () => {
        isInitialized = true;
        loadCurrentLang();
    }

    return Object.freeze({
        translate: translate,
        init: init,
        isLangLoaded: isLangLoaded,
        currentLang: currentLang,
    })
}

const translationService = TranslationService(); // singleton, init in module to avoid two instances. See export at the top of the file
export {translationService}
