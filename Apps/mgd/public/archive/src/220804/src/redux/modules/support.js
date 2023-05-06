// import store from 'store2';
// import superagent from 'superagent';
// import apiUrl from './../../constants/apiConstants';

export const sendFeedbackEmail = (data) => async (dispatch, getState, api) => {
  try {
  const res = await api.post(`/feedback`, { data });
  if(res && res.success === 1){
    return true;
  }
  } catch (error) {
    return error
  }
  // const res = await api.post(`${apiUrl.apiUrl}/feedback`, { data });
}