const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 181957.52,
  centerY: 586333.33,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 172558.47,
  miny: 577168.60,
  maxx: 193007.16,
  maxy: 596825.10,
  min_zoom: 14.5, 
  max_zoom: 22,
  default_zoom: 15.5
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/lhv/org',
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
