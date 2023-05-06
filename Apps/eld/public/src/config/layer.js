export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/eld_general_vector/eld_general/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type: 'arcgis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/eld_general_vector/eld_update_address_sde/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type: 'arcgis',
   virtualGroup: "כתובות",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/eld_general_vector/eld_cadaster/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type: 'arcgis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/eld_general_vector/eld_herum/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type: 'arcgis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/eld_general_vector/eld_ITown_YK/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type: 'arcgis'
  },
]