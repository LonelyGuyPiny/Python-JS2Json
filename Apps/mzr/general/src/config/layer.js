export default [
  {
    type:"arcgis",
     url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_general/MapServer',
     export: ['kmz', 'GeoJSON', 'csv'],
   },
   {
    type:"arcgis",
     url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_yk/MapServer',
     export: ['kmz', 'GeoJSON', 'csv'],
   },
   {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_projects/MapServer',
     export: ['kmz', 'GeoJSON', 'csv'],
     type:"arcgis",
 },
  {
  type:"arcgis",
   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_bantal/MapServer',
  export: ['kmz', 'GeoJSON', 'csv'],
   },
   {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
    virtualGroup: "מנהל תיכנון",
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
]