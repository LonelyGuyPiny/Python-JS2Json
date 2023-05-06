import store from 'store2';
import translations from '../../translations';
import { updateMeasurementsOnLangChange } from './drawing';
import { settings, languageMenu } from '../../config/settings';

const TRANSLATION = 'translation/TRANSLATION';

const langVal = Object.values(languageMenu).filter(fl => fl === true);

let defaultLanguage = '';
if(langVal.length === 1) {
  Object.keys(languageMenu).forEach(element => {
    if (languageMenu[element]) {
      defaultLanguage = `${element}`
    }
  });
} else {
  defaultLanguage = store('LANG') || settings.defaultLanguage;
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

export const changeLanguage = (language = defaultLanguage) => async (dispatch, getState, api) => {
  if (translations[language]) {
    store('LANG', language);
    store('TRANSLATION', translations[language].translation)
    await dispatch({ type: TRANSLATION, translation: translations[language].translation, language, code:translations[language].code, direction: translations[language].direction});
    dispatch(updateMeasurementsOnLangChange());
  }
};
