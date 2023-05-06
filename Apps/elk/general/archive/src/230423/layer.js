export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/yosh_minhal_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/elk_general_vector/elk_yk_compilation/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/elk_general_vector/elk_plans/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bina_general_vector/elk_Bina/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
]