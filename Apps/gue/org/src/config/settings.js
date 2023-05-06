const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 222485.48,
  centerY: 616411.64,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 25168.77,
  miny: 280180.98,
  maxx: 341887.56,
  maxy: 849177.96,
  min_zoom: 3, 
  max_zoom: 25,
  default_zoom: 3
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/gue/org',
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
