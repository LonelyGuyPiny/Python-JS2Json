import superagent from 'superagent';
import store from 'store2';
import _ from 'lodash';
import config from '../clientConfig';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  if (/^(\/\/|http|https)/.test(path)) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  const endpoint = `${config.apiUrl}${adjustedPath}`;
  return endpoint;
}

const AuthIntercept = require('superagent-intercept')((err, res) => {
  if (res && res.status === 401) {
    store.remove('authToken');
    store.remove('authUser');
    window.location.assign('/');
  }
});

export default class ApiClient {
  constructor(req) {
    const self = this;

    methods.forEach((method) => {
      this[method] = (path, { params, data, files } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        request.use(AuthIntercept);

        // don't set empty params
        if (params) {
          const emptySting = val => val === '';
          const qp = _(params)
            .omitBy(_.isUndefined)
            .omitBy(_.isNull)
            .omitBy(emptySting)
            .value();

          request.query(qp);
        }

        if (data && !files) {
          request.send(data);
        }

        // Upload Files. its a multipart form
        if (files && files.length > 0) {
          files.forEach(file => request.attach(file.name, file));

          self.filedNameValue(data)
            .forEach(keyVal => request.field(keyVal[0], keyVal[1]));
        }

        // set auth token if found in local storage
        const authToken = store('authToken');
        if (authToken) {
          request.set({ Authorization: authToken });
        }

        request.end((err, { body } = {}) => {
          if (err) {
            // Handle joi validation errors.
            if (body && body.validation) {
              const messages = body.message.split('.');
              const validationErrors = {};
              body.validation.keys.forEach((key, idx) => {
                validationErrors[key] = messages[idx].replace(`"${key}"`, '').trim();
              });

              reject({ message: validationErrors });
              return;
            }

            if (body && body.message) {
              reject(body.message);
              return;
            }

            reject(err);
          } else {
            resolve(body);
          }
        });
      });
    });
  }
  
  filedNameValue(obj, pKey = '') {
    const self = this;
    if (!obj) {
      return [];
    }

    const res = [];

    Object
      .keys(obj)
      .forEach((key) => {
        const val = obj[key];
        const newKey = pKey ? `${pKey}[${key}]` : key;
        if (typeof val === 'object') {
          self.filedNameValue(val, newKey)
            .forEach((o) => {
              res.push([o[0], o[1]]);
            });
        } else if (val) {
          res.push([newKey, val]);
        }
      });

    return res;
  }
}
