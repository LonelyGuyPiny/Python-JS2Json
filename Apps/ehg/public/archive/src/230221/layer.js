export default [
  {
  url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_general/MapServer',
  type:"arcgis",
  export: ['kmz', 'GeoJSON', 'csv'],
   },
   {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_cadaster/MapServer',
    type:"arcgis",
    export: ['kmz', 'GeoJSON', 'csv'],
     },
   {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_compilation/MapServer',
    type:"arcgis",
    export: ['kmz', 'GeoJSON', 'csv'],
     },
  {
    
     url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_bantal/MapServer',
     type:"arcgis",
     export: ['kmz', 'GeoJSON', 'csv'],
  
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_maagal/MapServer',
    type:"arcgis",
    export: ['kmz', 'GeoJSON', 'csv'],
     },
     {
      url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_tama/MapServer',
      type:"arcgis",
      export: ['kmz', 'GeoJSON', 'csv'],
    },
    {
      url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/egh_tamam/MapServer',
      type:"arcgis",
      export: ['kmz', 'GeoJSON', 'csv'],
    },
    {
      url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_tocnit_mitar_artzi/MapServer',
      type:"arcgis",
      export: ['kmz', 'GeoJSON', 'csv'],
    },
    {
      url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
      virtualGroup: "מנהל תיכנון",
      export: ['kmz', 'GeoJSON', 'csv'],
     type:"arcgis",
    },
    {
      url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_tama_tamm/MapServer',
      virtualGroup: "מנהל תכנון-תכניות ארציות",
      export: ['kmz', 'GeoJSON', 'csv'],
     type:"arcgis",
    },
]