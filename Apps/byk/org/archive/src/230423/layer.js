export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_address/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
     type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_handasa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
     type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_cadaster/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_bitahon/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/BYK_Bus_stations/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/BYK_public_parking/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_business/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_toshavim/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
    virtualGroup: "מנהל תכנון",
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
]