const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 225795.80,
  centerY: 759645.63,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 221317.01,
  miny: 757034.86,
  maxx: 230022.49,
  maxy: 763148.03,
  min_zoom: 10.5, 
  max_zoom: 23,
  default_zoom: 11
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/bna/org',
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
