const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 273930.78,
  centerY: 772112.43,
  extent: true, // determine if there is an extent to the app. if false - next 4 parameters are irelevant
  minx: 41532.55,
  miny: 597576.99,
  maxx: 448279.48,
  maxy: 950694.51,
  min_zoom: 10.5, 
  max_zoom: 22,
  default_zoom: 10.5
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/test/org',
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
