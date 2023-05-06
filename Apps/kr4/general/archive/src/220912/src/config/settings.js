const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 211365.58,
  centerY: 604047.56,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 202506.03,
  miny: 598640.01,
  maxx: 224521.24,
  maxy: 610681.18,
  min_zoom: 15, 
  max_zoom: 22,
  default_zoom: 16
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/kr4/general',
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