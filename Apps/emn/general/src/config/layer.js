export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_handasa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_infastructures/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_bitahon/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_revaha/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_arnona_02_2022/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    virtualGroup:"ארנונה"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_garbage_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    virtualGroup:"אצירת פסולת"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/emn_general_vector/emn_baalut_mekarkein/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    virtualGroup:"בעלות מקרקעין"
  },
   
]