import store from 'store2';
import translations from '../../translations';
import { updateMeasurementsOnLangChange } from './drawing';
import { settings, languageMenu } from '../../config/settings';

const TRANSLATION = 'translation/TRANSLATION';

const basepath = sessionStorage.getItem('basepath');

const langVal = Object.values(languageMenu).filter(fl => fl === true);

let defaultLanguage = '';
if(langVal.length === 1) {
  Object.keys(languageMenu).forEach(element => {
    if (languageMenu[element]) {
      defaultLanguage = `${element}`
    }
  });
} else {
  defaultLanguage = store(`${basepath}-lang`) || settings.defaultLanguage;
}

const initialState = {
  translation: translations[defaultLanguage].translation,
  language: defaultLanguage,
  name : translations[defaultLanguage].name,
  code: translations[defaultLanguage].code,
  direction: translations[defaultLanguage].direction
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANSLATION:
      return { ...state, translation: action.translation, language: action.language, name:action.name, code: action.code, direction: action.direction  };
    default:
      return state;
  }
}

/**
 * @function
 * @name changeLanguage
 * @description
 * change the language and translation
 * @param {string} {language}
 * @returns {string} language and translation
 */

export const changeLanguage = (language = defaultLanguage) => async (dispatch, getState, api) => {
  if (translations[language]) {
    store(`${basepath}-lang`, language);
    store(`${basepath}-translation`, translations[language].translation)
    await dispatch({ type: TRANSLATION, translation: translations[language].translation, language, code:translations[language].code, direction: translations[language].direction});
    dispatch(updateMeasurementsOnLangChange());
  }
};
