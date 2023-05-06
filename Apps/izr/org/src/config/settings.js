const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 224446.10,
  centerY: 729907.74,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 182721.95,
  miny: 676689.02,
  maxx:  315956.12,
  maxy: 799699.00,
  min_zoom: 11, 
  max_zoom: 22,
  default_zoom: 0.2
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/izr/org',
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
