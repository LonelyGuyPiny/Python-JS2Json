const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 253655.52,
  centerY: 790574.69,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 241674.99,
  miny: 780511.42,
  maxx: 267001.09,
  maxy: 804173.58,
  min_zoom: 14, 
  max_zoom: 21,
  default_zoom: 15
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/kr8/public',
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
