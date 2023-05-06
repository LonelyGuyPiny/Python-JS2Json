const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 172201.78,
  centerY: 638625.42,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 150651.72,
  miny: 629862.36,
  maxx: 206721.15,
  maxy: 650699.68,
  min_zoom: 12, 
  max_zoom: 22,
  default_zoom: 13.5
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/hya/general',
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
