const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 204725.7,
  centerY: 707447.2,
  extent: true, // determine if there is an extent to the app. if false - next four parameters are irelevant
  minx: 195147.5,
  miny: 699483.2,
  maxx: 218672.0,
  maxy: 719513.2,
  min_zoom: 15, 
  max_zoom: 22,
  default_zoom: 15.5
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/hrs/public',
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
