const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 181766.60,
  centerY: 659138.39,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 173740.13,
  miny: 652109.97,
  maxx: 189981.95,
  maxy: 667636.73,
  min_zoom: 15, 
  max_zoom: 22,
  default_zoom: 15.5
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  version: '1.0.0',
  email: 'office@inter-town.com',
  login: false,
  basepath: 'azr/public',
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
