const mapData = {
  projection: 'EPSG:2039',
  latestWkid: 2039,
  centerX: 225912.06,
  centerY: 691750.70,
  extent: true, // determine if there is an extent to the app. if false - next for parameters are irelevant
  minx: 181330.13,
  miny: 648873.97,
  maxx: 268315.84,
  maxy: 734249.60,
  min_zoom: 5, 
  max_zoom: 22,
  default_zoom: 5

}


const settings = {
  defaultLanguage: 'HE',
  isMapComparison: true,
  email: 'office@inter-town.com',
  login: true,
  basepath: '/smr/org',
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
