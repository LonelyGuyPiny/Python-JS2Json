import superagent from 'superagent';
// import SOURCE from '../sources';

/**
 * @function
 * @name login_ARCGIS
 * @description
 * middleware for toc data fetching from arcgis source
 * @param {Object} {layer} layer config data
 * @returns {toc data}
 */
export const login_ARCGIS = async (requestData) => {
  try {
    const data = {
      request: 'getToken',
      username: requestData.username,
      password: requestData.password,
      client: 'referer',
      referer: requestData.referer,
      expiration: (60 * 24), // 1 day
      f: 'json'
    };
    const res = await superagent.post(`${requestData.url}/tokens/`)
      .send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .timeout({
        response: 5000, // Wait 5 seconds for the server to start sending,
        deadline: 60000, // but allow 1 minute for the file to finish loading.
      });
    return res;
  } catch (err) {
    console.log("login err", err);
  }
}