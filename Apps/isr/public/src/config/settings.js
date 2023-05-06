const mapData = {
  projection: 'EPSG:3857',
  latestWkid: 3857,
  centerX: 3889115.999150,
  centerY: 3725235.010506,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 2582960.059813,
  miny: 3052589.161597,
  maxx: 4573991.772585,
  maxy: 4060334.942509,
  min_zoom: 8, 
  max_zoom: 22,
  default_zoom: 8
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/isr/public',
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
