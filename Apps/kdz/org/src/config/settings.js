const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 192884.11,
  centerY: 687605.46,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 173713.39,
  miny: 675561.3,
  maxx: 216112.93,
  maxy: 706312.48,
  min_zoom: 14, 
  max_zoom: 22,
  default_zoom: 15
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  version: '1.0.0',
  email: 'office@inter-town.com',
  login: true,
  basepath: 'kdz/org',
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
