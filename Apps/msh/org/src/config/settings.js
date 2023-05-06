const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 192347.32,
  centerY: 689236.98,
  extent: true, // determine if there is an extent to the app. if false - next four parameters are irelevant
  minx: 184743.95,
  miny: 680586.54,
  maxx: 205073.22,
  maxy: 701162.69,
  min_zoom: 11, 
  max_zoom: 22,
  default_zoom: 12
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/msh/org',
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
