const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 176176,
  centerY: 626618,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 170438.25,
  miny: 623257.12,
  maxx: 184574.05,
  maxy: 631051.25,
  min_zoom: 11, 
  max_zoom: 22,
  default_zoom: 10
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/krm/general',
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
