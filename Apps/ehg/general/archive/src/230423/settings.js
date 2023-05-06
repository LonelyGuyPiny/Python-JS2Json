const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 254027.23,
  centerY: 769611.98,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 240715.60,
  miny: 754285.71,
  maxx: 269838.00,
  maxy: 813880.78,
  min_zoom: 5, 
  max_zoom: 22,
  default_zoom: 6
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/ehg/general',
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
