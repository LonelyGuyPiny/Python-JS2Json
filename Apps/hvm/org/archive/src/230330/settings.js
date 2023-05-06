const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 194846.80,
  centerY: 656316.20,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 167240.31,
  miny: 637692.70,
  maxx: 223192.00,
  maxy: 681278.18,
  min_zoom: 12, 
  max_zoom: 22,
  default_zoom: 10
}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  version: '1.0.0',
  email: 'office@inter-town.com',
  login: true,
  basepath: 'hvm/org',
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
