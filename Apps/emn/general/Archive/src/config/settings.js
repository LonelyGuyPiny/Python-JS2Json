const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 213300.91,
  centerY: 674393.93,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 185169.11,
  miny: 651218.70,
  maxx: 289155.81,
  maxy: 800895.74,
  min_zoom: 8, 
  max_zoom: 22,
  default_zoom: 15.5
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  version: '1.0.0',
  email: 'office@inter-town.com',
  login: true,
  basepath: 'emn/general',
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