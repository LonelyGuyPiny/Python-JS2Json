export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mtb_general_vector/mtb_infrastructure/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_minhal/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
]