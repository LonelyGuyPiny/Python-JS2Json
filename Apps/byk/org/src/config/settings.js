const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 184668.36,
  centerY: 649386.81,
  extent: true, // determine if there is an extent to the app. if false - next 4 parameters are irelevant
  minx: 177918.56,
  miny: 644257.80,
  maxx: 194033.37,
  maxy: 658869.73,
  min_zoom: 8, 
  max_zoom: 22,
  default_zoom: 11.5
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/byk/org',
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
