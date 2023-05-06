export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_cadaster_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    virtualGroup: "מינהל התכנון - תוכניות מקוונות",
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/XplanNoKanam/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  }, 
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_tama/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  }, 
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/TAMA_1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_all_plans_bar/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_building_irrgularities_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_bakasha_bar/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_mosadot/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_environment/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_gvul/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_tamrurim/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_others/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_tashtiot_in/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_arnona/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_herum/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_security_camera_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
]