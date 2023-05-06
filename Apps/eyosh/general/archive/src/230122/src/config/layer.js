export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/yosh_minhal_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/yosh_lamas/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/Education/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    virtualGroup:"חינוך",
  },
]