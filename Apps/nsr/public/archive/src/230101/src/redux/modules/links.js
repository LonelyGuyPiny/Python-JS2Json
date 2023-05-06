import links from '../../config/links';

const initialState = {
  links: links,
};

export default function reducer(state = initialState, action) {
  // switch (action.type) {
  //   case TRANSLATION:
  //     return {...state, translation: action.translation, language: action.language, name:action.name, code: action.code, direction: action.direction  };
  //   default:
  //     return state;
  // }
  return state;
}

// export const changeLanguage = (language = defaultLanguage) => async (dispatch, getState, api) => {
//   if (translations[language]) {
//     store('LANG', language);
//     await dispatch({ type: TRANSLATION, translation: translations[language].translation, language, code:translations[language].code, direction: translations[language].direction});
//     dispatch(updateMeasurementsOnLangChange());
//   }
// };
