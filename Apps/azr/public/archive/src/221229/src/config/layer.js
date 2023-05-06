export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_cadaster_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_yk/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_mosadot/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_environment/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_tamrurim/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_tashtiot/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
     url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/national/tmm_5_yk/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
]