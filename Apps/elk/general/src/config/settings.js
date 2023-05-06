const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 203479.15,
  centerY: 668626.05,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 160582.48,
  miny: 620370.01,
  maxx: 247839.44,
  maxy: 711925.84,
  min_zoom: 8, 
  max_zoom: 22,
  default_zoom: 15.5
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  version: '1.0.0',
  email: 'office@inter-town.com',
  login: true,
  basepath: 'elk/general',
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