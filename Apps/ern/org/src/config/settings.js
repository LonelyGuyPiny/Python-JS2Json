const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 211550.71,
  centerY: 713557.32,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 162556.04,
  miny: 695004.37,
  maxx: 261605.26,
  maxy: 780513.18,
  min_zoom: 12.6, 
  max_zoom: 22,
  default_zoom: 12.6
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/ern/org',
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
