const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 228533.37,
  centerY: 651875.28,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 100812.35,
  miny: 517032.90,
  maxx: 414788.40,
  maxy: 808210.59,
  min_zoom: 2, 
  max_zoom: 20,
  default_zoom: 5
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: 'eyosh/org',
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
