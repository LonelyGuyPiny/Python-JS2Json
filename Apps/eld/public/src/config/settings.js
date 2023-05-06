const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 196043.84,
  centerY: 661937.67,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 189555.83,
  miny: 655345.55,
  maxx: 201808.28,
  maxy: 667192.49,
  min_zoom: 15.5, 
  max_zoom: 22,
  default_zoom: 16.5
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: 'eld/public',
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
