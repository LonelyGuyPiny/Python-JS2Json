const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 229994.79,
  centerY: 736388.71,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 225707.97,
  miny: 733445.69,
  maxx: 236948.82,
  maxy: 739817.41,
  min_zoom: 13.5, 
  max_zoom: 23,
  default_zoom: 16
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: false,
  basepath: '/rne/public',
  LayersOpacity: 0.75,                // use 0 to 1
  defaultBuffer: 50,
  maxBuffer: 2000,
  stepBuffer: 5,
  minBuffer: 0
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
