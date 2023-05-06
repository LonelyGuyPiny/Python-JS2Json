const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 216029.79,
  centerY: 746096.83,
  extent: true, // determine if there is an extent to the app. if false - next four parameters are irelevant
  minx: 195292.33,
  miny: 733605.25,
  maxx: 239443.48,
  maxy: 759132.54,
  min_zoom: 5, 
  max_zoom: 25,
  default_zoom: 15
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/shf/org',
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
