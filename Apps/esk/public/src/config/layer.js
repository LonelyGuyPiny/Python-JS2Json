export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/esk_general_vector/esk_general/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/esk_general_vector/esk_Bitahon/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/esk_general_vector/esk_education/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/national/National_Health/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/esk_general_vector/esk_survey/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/esk_general_vector/esk_plans/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    exportKMZ: false,
    exportCSV: false,
    virtualGroup: "מינהל התכנון - תוכניות מקוונות"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/esk_general_vector/esk_bntl/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type:'argis'
  },
]