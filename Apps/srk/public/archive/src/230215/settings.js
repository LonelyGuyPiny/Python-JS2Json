const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 177708.23,
  centerY: 640211.94,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 120356.68,
  miny: 622984.25,
  maxx: 223327.17,
  maxy: 666242.59,
  min_zoom: 12, 
  max_zoom: 22,
  default_zoom: 12.6
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/srk/public',
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
