const config = {
  development: {
    apiUrl: 'https://gis-intertown-api.symple.co.in'
  },
  staging: {
    apiUrl: 'https://gis-intertown-api.symple.co.in'
  },
  production: {
    apiUrl: 'https://arcgis.intertown.co.il/krg_arcgis'
  }
};

export default config[process.env.REACT_APP_ENV || 'development'];
