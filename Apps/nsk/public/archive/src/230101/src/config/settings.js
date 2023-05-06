const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 183330.90,
  centerY: 633919.85,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 159391.84,
  miny: 618309.82,
  maxx: 207432.01,
  maxy: 654307.88,
  min_zoom: 13.5, 
  max_zoom: 22,
  default_zoom: 14
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/nsk/public',
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
