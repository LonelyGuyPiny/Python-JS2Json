const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 174318.82,
  centerY: 636082.25,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 151016.77,
  miny: 617421.95,
  maxx: 246735.74,
  maxy: 663213.73,
  min_zoom: 13.5, 
  max_zoom: 22,
  default_zoom: 14
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/gdr/org',
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
