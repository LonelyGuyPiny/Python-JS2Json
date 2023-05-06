export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/has_general_vector/Mate_Asher_building_agriculture/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mas_general_vector/%D7%AA%D7%A9%D7%A8%D7%99%D7%98%D7%99%D7%9D_%D7%9E%D7%90%D7%95%D7%97%D7%93%D7%99%D7%9D/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    virtualGroup:"תשריטים מאוחדים",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mas_general_vector/mate_asher_hetel_biuv/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mas_general_vector/Map_sheet/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
]