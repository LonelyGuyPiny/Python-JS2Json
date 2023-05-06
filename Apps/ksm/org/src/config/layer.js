export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/ksm_general_vector/ksm_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/ksm_general_vector/ksm_cadaster/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/ksm_general_vector/ksm_YK/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    virtualGroup: 'מנהל התכנון',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan_2039/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "argis",
  },
  // {
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/shf_general_vector/shf_YK_Plans/MapServer',
  //   export: ['kmz', 'GeoJSON', 'csv'],
  //   type:"arcgis",
  // },
  // {
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/shf_general_vector/shf_photogrametria/MapServer',
  //   export: ['kmz', 'GeoJSON', 'csv'],
  //   type:"arcgis",
  // },
  // {
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/shf_general_vector/shf_Emergency/MapServer',
  //   export: ['kmz', 'GeoJSON', 'csv'],
  //   type:"arcgis",
  // },
  // {
  //   url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
  //   virtualGroup: "מנהל התכנון ",
  //   export: ['kmz', 'GeoJSON', 'csv'],
  //   type:"arcgis",
  // },
  // {
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/shf_general_vector/shf_TMA_TMM/MapServer',
  //   export: ['kmz', 'GeoJSON', 'csv'],
  //   type:"arcgis",
  // },
]