const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 172833.67,
  centerY: 627633.81,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 126866.56,
  miny: 603973.62,
  maxx: 205197.14,
  maxy: 644737.43,
  min_zoom: 12.5, 
  max_zoom: 22,
  default_zoom: 13
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/btv/general',
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
