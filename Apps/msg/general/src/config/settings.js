const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 223880.55,
  centerY: 752279.56,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 162641.87,
  miny: 658670.78,
  maxx: 272505.22,
  maxy: 767673.20,
  min_zoom: 12, 
  max_zoom: 23,
  default_zoom: 13
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/msg/general',
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
