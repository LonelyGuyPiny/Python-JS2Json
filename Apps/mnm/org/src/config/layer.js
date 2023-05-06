export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: 'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_Infra/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: 'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_field_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: 'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_herum/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: 'arcgis',
  },
]