const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 180942.15,
  centerY: 502681.17,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 172074.36,
  miny: 496259.20,
  maxx: 206357.36,
  maxy: 516105.67,
  min_zoom: 14, 
  max_zoom: 21,
  default_zoom: 15
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/mzr/general',
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
