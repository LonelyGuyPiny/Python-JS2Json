import superagent from 'superagent';
import store from 'store2';

/**
 * @function
 * @name login_ARCGIS_EMBEDDED
 * @description
 * login for arcgis embedded source
 * @param {Object} {requestData} login creadentials
 * @returns {string} token
 */
export const login_ARCGIS_EMBEDDED = async (requestData) => {
  try {
    const basepath = sessionStorage.getItem('basepath');
    const tokens = store(`${basepath}-authTokens`);
    const urlOrigin = new URL(requestData.url).origin;
    if (tokens && tokens.length > 0) {
      var tokenData = tokens.find(t => t.origin === urlOrigin);
    }
    if (tokenData && Date.now() > tokenData.expires) {
      return {
        validToken: true
      };
    } else {
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
    }
  } catch (err) {
    // console.log("login err", err);
  }
}