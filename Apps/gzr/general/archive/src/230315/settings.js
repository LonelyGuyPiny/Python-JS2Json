const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 189584.04,
  centerY: 642761.19,
  extent: true, // determine if there is an extent to the app. if false - next 4 parameters are irelevant
  minx: 147599.69,
  miny: 627163.61,
  maxx: 223721.91,
  maxy: 652315.57,
  min_zoom: 12.5, 
  max_zoom: 22,
  default_zoom: 13
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/gzr/general',
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
