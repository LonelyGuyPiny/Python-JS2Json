const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 226103.34,
  centerY: 639687.67,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 189422.47,
  miny: 620738.84,
  maxx: 257277.89,
  maxy: 687835.94,
  min_zoom: 10, 
  max_zoom: 22,
  default_zoom: 10
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/mtb/general',
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
