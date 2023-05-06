const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 239370.63,
  centerY: 763398.11,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 165376.73,
  miny: 687003.86,
  maxx: 349481.51,
  maxy: 870202.38,
  min_zoom: 12, 
  max_zoom: 22,
  default_zoom: 12.2
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/mhg/org',
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
