const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 180180.57,
  centerY: 638815.66,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 152554.84,
  miny: 618562.38,
  maxx: 216421.22,
  maxy: 657723.62,
  min_zoom: 13.5, 
  max_zoom: 22,
  default_zoom: 12
}

const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/brn/org',
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
