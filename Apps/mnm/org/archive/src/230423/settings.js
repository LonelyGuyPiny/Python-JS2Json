const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 225493.03,
  centerY: 729523.68,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 204533.71,
  miny: 713107.81,
  maxx: 259550.16,
  maxy: 765887.27,
  min_zoom: 13.5, 
  max_zoom: 23,
  default_zoom: 12
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/mnm/org',
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
