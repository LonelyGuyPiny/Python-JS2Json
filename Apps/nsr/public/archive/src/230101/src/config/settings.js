const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 203999.92,
  centerY: 742262.46,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 195614.70,
  miny: 733780.70,
  maxx: 217681.85,
  maxy: 754493.21,
  min_zoom: 14, 
  max_zoom: 22,
  default_zoom: 15
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/nsr/public',
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
