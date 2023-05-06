const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 174287.04,
  centerY: 613923.31,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 123456.81,
  miny: 577762.83,
  maxx: 224202.74,
  maxy: 651353.51,
  min_zoom: 12.6, 
  max_zoom: 22,
  default_zoom: 12.6
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/sfr/public',
  LayersOpacity: 0.75,                // use 0 to 1
  defaultBuffer: 50,
  maxBuffer: 2000,
  stepBuffer: 5,
  minBuffer: 0,
  isZoomGeolocation: true,
  zoomGeolocation: 18,
}

const languageMenu = {
  HE: true,
  EN: true
}

export {
  mapData,
  settings,
  languageMenu
}
