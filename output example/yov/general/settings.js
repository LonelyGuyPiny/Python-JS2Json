const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 178844.94,
  centerY: 621487.67,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 132995.99,
  miny: 592667.67,
  maxx: 227932.99,
  maxy: 648425.54,
  min_zoom: 11, 
  max_zoom: 22,
  default_zoom: 12
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/yov/general',
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
