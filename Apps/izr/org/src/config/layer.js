export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
    virtualGroup: "מנהל תכנון",
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_BNTL/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_gvoolot/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_industry/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_compilation/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_agriculture/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_cadaster/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_Arnona/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_Bina/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_residents/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/izr_general_vector/izr_infrastructures/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_roadsigns/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_security_enforcement/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_emergency/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    virtualGroup:"סקר עצים",
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_tree_surv/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    virtualGroup:"אשפה",
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_garbage/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_sviva/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mgd_general_vector/mgd_bikes/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/TAMA_1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    virtualGroup:'תמ"מ 2 / 9',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_2_9/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_TMM2_9_SVIVA/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
]