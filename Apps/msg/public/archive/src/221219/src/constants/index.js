// import mainMenuItems from './mainMenuItems';
//import language from './systemSettings';
const CRPTYRTOKEN = 'xg8250nbg4klq5b3';

const drawingOptions = [
  { key: 'Point', text: 'Point', value: 'Point' },
  { key: 'LineString', text: 'LineString', value: 'Line' },
  { key: 'Polygon', text: 'Polygon', value: 'Polygon' },
  // { key: 'triangle', text: 'Triangle', value: 'triangle' },
  // { key: 'Circle', text: 'Circle', value: 'Circle' }, 
  { key: 'Box', text: 'Box', value: 'Box' }, 
];

const dashboardDrawingOptions = [
  { key: 'Point', text: 'Point', value: 'Point' },
  { key: 'LineString', text: 'LineString', value: 'Line' },
  { key: 'Polygon', text: 'Polygon', value: 'Polygon' },
  // { key: 'triangle', text: 'Triangle', value: 'triangle' },
  // { key: 'Circle', text: 'Circle', value: 'Circle' }, 
  { key: 'Box', text: 'Box', value: 'Square' },
];

const languageSetting = [
  {key:'english', value:'English', text:'English'},
  {key:'hebrew', value:'Hebrew', text:'Hebrew'}
]

const spatialReference = [
  {key: 'EPSG:2039', value: 'EPSG:2039', text:'Israeli TM Grid'},
  // {key: 'EPSG:18203', value: 'EPSG:18203', text: 'Israeli CS'},
  {key: 'EPSG:3857', value: 'EPSG:3857', text: 'Projected WGS 84'},
  {key: 'EPSG:4326', value: 'EPSG:4326', text: 'Geographic WGS 84'}
]

const areaForImperial = [
  {key:'squareFeet', value:'Square Feet', text:'Square Feet'},
  {key:'squareYards', value:'Square Yards', text:'Square Yards'},
  {key:'squareAcres', value:'Square Acres', text:'Square Acres'},
  {key:'squareMiles', value:'Square Miles', text:'Square Miles'}
]

const distanceForImperial = [
  {key:'feets', value:'Feets', text:'Feets'},
  {key:'yards', value:'Yards', text:'Square Yards'},
  {key:'miles', value:'Miles', text:'Miles'}
]

const areaForMetric = [
  {key:'Square meters', value:'Square meters', text:'Square meters'},
  {key:'Dunam', value:'Dunam', text:'Dunam'},
  {key:'Square Kilometers', value:'Square Kilometers', text:'Square Kilometers'}
]

const distanceForMetric = [
  {key:'Meters', value:'Meters', text:'Meters'},
  {key:'Kilometers', value:'Kilometers', text:'Kilometers'},
]

const phoneRegex = /^\(?([+]{0,1})\)?[.]?\(?([0-9]{0,2})\)?[-. ]?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export {
  drawingOptions,
  dashboardDrawingOptions,
  // mainMenuItems,
  CRPTYRTOKEN,
  languageSetting,
  spatialReference,
  distanceForImperial,
  distanceForMetric,
  areaForImperial,
  areaForMetric,
  phoneRegex,
  emailRegex
};
