const SHAPES = {
  Point: { index: 0, name: 'Point' },
  LineString: { index: 1, name: 'LineString' },
  Polygon: { index: 2, name: 'Polygon' },
  Circle: { index: 3, name: 'Circle' },
  Box: { index: 4, name: 'Box' },
  Text: { index: 5, name: 'Text' },
}

const SHAPES_INDEX = [
  'Point',
  'LineString',
  'Polygon',
  'Circle',
  'Box',
  'Text',
]

const JUST_MEASURE = {
  LineString: { index: 1, name: 'LineString', text: 'Length' },
  Polygon: { index: 2, name: 'Polygon', text: 'Area' },
};

const JUST_MEASURE_INDEX = [
  'LineString',
  'Polygon'
];

const FONTS_OPTIONS = [
  { key: 'al', value: 'Alef', text: 'Alef' },
  { key: 'am', value: 'Amatic SC', text: 'Amatic SC' },
  { key: 'ar', value: 'Arimo', text: 'Arimo' },
  { key: 'as', value: 'Assistant', text: 'Assistant' },
  { key: 'be', value: 'Bellefair', text: 'Bellefair' },
  { key: 'co', value: 'Cousine', text: 'Cousine' },
  { key: 'da', value: 'David Libre', text: 'David Libre' },
  { key: 'fr', value: 'Frank Ruhl Libre', text: 'Frank Ruhl Libre' },
  { key: 'he', value: 'Heebo', text: 'Heebo' },
  { key: 'mp', value: 'M PLUS 1p', text: 'M PLUS 1p' },
  { key: 'mpr', value: 'M PLUS Rounded 1c', text: 'M PLUS Rounded 1c' },
  { key: 'ml', value: 'Miriam Libre', text: 'Miriam Libre' },
  { key: 'ru', value: 'Rubik', text: 'Rubik' },
  { key: 'so', value: 'Secular One', text: 'Secular One' },
  { key: 'su', value: 'Suez One', text: 'Suez One' },
  { key: 'ti', value: 'Tinos', text: 'Tinos' },
  { key: 'vr', value: 'Varela Round', text: 'Varela Round' },
]

export {
  SHAPES,
  SHAPES_INDEX,
  JUST_MEASURE,
  JUST_MEASURE_INDEX,
  FONTS_OPTIONS
}