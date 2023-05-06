import {
  createValidator
} from 'revalidate';
import FileDownload from 'js-file-download';
import Axios from 'axios';
import CryptoJS from 'crypto-js';
import {
  CRPTYRTOKEN
} from '../constants';
import {
  averageDataToc
} from '../redux/modules/toc';
import _ from 'lodash';
import store from 'store2';
import moment from 'moment';

const secretkey = CRPTYRTOKEN;

/**
 * return encrypted string
 * @param data
 */
// const cryptData = data => cryptr.encrypt(data);
const cryptData = (data) => {
  const str = CryptoJS.AES.encrypt(data.toString(), secretkey);
  return str.toString().replace(new RegExp('/', 'g'), '7b9a');
};

/**
 * Returns decrypted data
 * @param data
 */
// const decryptData = data => cryptr.decrypt(data);
// const decryptData = data => CryptoJS.AES.decrypt(data.toString(), secretkey);
const decryptData = (data) => {
  const d = data.replace(new RegExp('7b9a', 'g'), '/');
  const bytes = CryptoJS.AES.decrypt(d, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const isValidPhoneNumber = createValidator(
  message => value => {
    let us = /^\(?([+]{0,1})\)?[.]?\(?([0-9]{0,2})\)?[-. ]?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (value && !value.match(us)) {
      return message
    }
  },
  'Invalid phone number'
);

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid Email ID'
);

const setDirToHtml = (language) => {
  const dir = language === "HE" ? "RTL" : "LTR";
  var html = document.getElementsByTagName("html")[0];
  var att = document.createAttribute("dir"); // Create a "class" attribute
  att.value = dir; // Set the value of the class attribute
  html.setAttributeNode(att);
}

const mathematicOperations = (columns, data, fn) => {
  const isNumber = num => (typeof num === "number");
  const hasValidRow = arr => arr.filter(key => key).every(isNumber);

  const reduce = (columns, arr) => columns.reduce((prev, next) => {
    let row = arr.map(key => key[next]);
    if (hasValidRow(row)) {
      prev.push({
        'name': next,
        value: fn(row)
      })
    }
    return prev;
  }, []);
  return reduce(columns, data);
}

const getAverage = (columnHeadings, selectedTableData, dispatch) => {
  const sum = arr => arr.reduce((a, b) => {
    return a + b;
  }, 0);
  const avg = arr => Math.round((sum(arr) / arr.length)) || 0;
  //const { selectedTableData, columnHeadings } = this.props;
  const average = mathematicOperations(columnHeadings, selectedTableData, avg)
  dispatch(averageDataToc(average))
}

const sortObjArray = (arr = [], param, type = 'number', sort = 'ASC') => {
  arr.sort(function (a, b, param, type) {
    if (type === 'number') {
      return Number(a[`${param}`]) - Number(b[`${param}`])
    }
    return a[`${param}`] - b[`${param}`]
  });
  if (sort === 'DESC') {
    arr.reverse();
  }
  return arr;
}

const downloadKMZFile = (path, extension) => {
  // const url = new URL(path);
  // const params = url.searchParams;
  // const index = path.indexOf("?");
  // let reqUrl = path;
  // if (index > 0) {
  //   reqUrl = path.substring(0, index);
  // }
  return new Promise((resolve) => {
    Axios({
        url: path,
        // data: {
        //   outFields: params.get('outFields'),
        //   where: params.get('where'),
        //   f: "kmz",
        //   token: params.get('token')
        // },
        method: 'GET',
        responseType: 'blob', // important
      })
      .then((response) => {
        FileDownload(response.data, `query.${extension}`);
        resolve(true);
      });
  })
}

const downloadFile = (path, name, extension) => {
  return new Promise((resolve) => {
    Axios({
      url: path,
      method: 'GET',
      responseType: 'blob', // important
    })
    .then((response) => {
      FileDownload(response.data, `${name}.${extension}`);
      resolve(true);
    });
  });
  // Axios({
  //     url: path,
  //     method: 'GET',
  //     responseType: 'blob', // important
  //   })
  //   .then((response) => {
  //     FileDownload(response.data, 'query.pdf');
  //   });
}

const distinct = (items, prop) => {
  var unique = [];
  var distinctItems = [];
  _.each(items, function (item) {
    if (unique[item[prop]] === undefined) {
      distinctItems.push(item);
    }
    unique[item[prop]] = 0;
  });
  return distinctItems;
}

const ismatch = (value, arr) => {
  let isVal = false;
  arr.forEach(val => {
    if (value.substring(0, 10).includes(val)) {
      isVal = true;
    }
  });
  return isVal;
}

const getToken = (url) => {
  const basepath = sessionStorage.getItem('basepath');
  const tokens = store(`${basepath}-authTokens`);
  const urlOrigin = new URL(url).origin;
  let token = null;
  if (tokens && tokens.length > 0) {
    const tokenData = tokens.find(t => t.origin === urlOrigin);
    if (tokenData) {
      token = tokenData.token;
    }
  }
  return token
}

const getTokenObj = (url) => {
  const token = getToken(url);
  if (token) {
    return ({
      token
    })
  }
  return {}
}

const getTokenForUrl = (url, param = 'token') => {
  const token = getToken(url);
  if (token) {
    return `&${param}=${token}`
  }
  return '';
}

const fillTemplate = function (string, vars) {
  // eslint-disable-next-line no-new-func
  return new Function("return `" + string + "`;").call(vars);
}

const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
}

const dateFunction = (value) => {
  let currentDate;
  if (value == null) {
    currentDate = new Date();
  } else {
    currentDate = new Date(value);
  }
  var dd = currentDate.getDate();

  var mm = currentDate.getMonth() + 1;
  var yyyy = currentDate.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  currentDate = dd + '/' + mm + '/' + yyyy;
  return currentDate
}

const createWhereCondition = (filtersData, defaultWhere = null) => {
  // debugger;
  try {
    if (Object.keys(filtersData).length === 0) {
      return defaultWhere || '1=1';
    }
    let where = defaultWhere ? `${defaultWhere} AND ` : '';
    Object.keys(filtersData).forEach((field, i) => {
      where = i > 0 ? where + " AND " : where;
      let {
        value
      } = filtersData[field];
      if (filtersData[field].type === 'esriFieldTypeString') {
        value = value.map(v => v.includes("'") ? v.replaceAll("'", "''") : v);
        if (filtersData[field].condition === 'same') {
          where += `${field} IN ('${value.join("','")}')`;
        } else if (filtersData[field].condition === 'differ') {
          where += `${field} NOT IN ('${value}')`;
        }
      } else if ((filtersData[field].type === 'esriFieldTypeDouble' || filtersData[field].type === 'esriFieldTypeSingle') && filtersData[field].condition === 'same') {
        // where += `${field} IN ('${value}')`;
        where += `${field} IN (${value})`;
      } else if (['esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'esriFieldTypeOID', 'esriFieldTypeDouble', 'esriFieldTypeSingle'].includes(filtersData[field].type)) {
        if (filtersData[field].isRange) {
          if (filtersData[field].condition === 'showInRange') {
            where += `${field} BETWEEN ${value.min} AND ${value.max}`;
          } else {
            where += `${field} NOT BETWEEN ${value.min} AND ${value.max}`;
          }
        } else {
          if (filtersData[field].condition === 'same') {
            where += `${field} IN (${value})`;
          } else if (filtersData[field].condition === 'differ') {
            where += `${field} NOT IN (${value})`;
          } else if (filtersData[field].condition === 'greater') {
            where += `${field} >= ${value}`;
          } else if (filtersData[field].condition === 'less') {
            where += `${field} < ${value}`;
          }
        }
      } else if (filtersData[field].type === 'esriFieldTypeDate') {
        if (filtersData[field].isRange) {
          const minDate = moment(filtersData[field].value.min).format('YYYY-MM-DD');
          const maxDate = moment(filtersData[field].value.max).format('YYYY-MM-DD');
          if (filtersData[field].condition === 'showInRange') {
            where += `${field} BETWEEN DATE '${minDate}' AND DATE '${maxDate}'`;
          } else {
            where += `${field} NOT BETWEEN DATE '${minDate}' AND DATE '${maxDate}'`;
          }
        } else {
          const date = moment(filtersData[field].value).format('YYYY-MM-DD');
          if (filtersData[field].condition === 'same') {
            where += `${field} = DATE '${date}'`;
          } else if (filtersData[field].condition === 'differ') {
            where += `${field} <> DATE '${date}'`;
          } else if (filtersData[field].condition === 'greater') {
            where += `${field} >= DATE '${date}'`;
          } else if (filtersData[field].condition === 'less') {
            where += `${field} <= DATE '${date}'`;
          }
        }
      }
    });
    // debugger;
    // where = where.trim();
    // if (where.substr(-3).includes('AND')) {
    //   where.substr(0, where.Length - 3)
    // }
    console.log('where', where);
    return where;
  } catch (err) {
    return '1=1';
  }
}

const replaceAt = (str, index, replacement) => {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

const compareValues = (key, order = 'asc', isAttributes = true) => {
  return function innerSort(a, b) {
    if (!a.attributes.hasOwnProperty(key) || !b.attributes.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a.attributes[key] === 'string') ?
      a.attributes[key].toUpperCase() : a.attributes[key];
    const varB = (typeof b.attributes[key] === 'string') ?
      b.attributes[key].toUpperCase() : b.attributes[key];

    let comparison = 0;
     if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    // console.log('varb =>', typeof b.attributes[key], varB);
    // if (varB === '' || varB === null || varB === 'null') {
    //   // console.log('sort =>', varA, varB);
    //   comparison = order === 'asc' ? -1 : 1;
    // }

    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

const sortObjArr = (key, order = 'asc', isAttributes = true) => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ?
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

const getRemoteFileSize = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
}


export {
  cryptData,
  decryptData,
  isValidPhoneNumber,
  isValidEmail,
  setDirToHtml,
  mathematicOperations,
  getAverage,
  sortObjArray,
  downloadKMZFile,
  downloadFile,
  distinct,
  ismatch,
  fillTemplate,
  getToken,
  getTokenObj,
  getTokenForUrl,
  isFloat,
  dateFunction,
  createWhereCondition,
  replaceAt,
  compareValues,
  sortObjArr,
  getRemoteFileSize
};
