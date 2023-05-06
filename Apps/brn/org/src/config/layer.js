export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/brn_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/srk_general_vector/srk_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_cadastre/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/brn_billing/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/brn_engineering/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/business_brener/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
    virtualGroup: "תכניות מקוונות",
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/brn_infra_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/brn_security/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_yk_compilation1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/srk_general_vector/srk_yk_settelment/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/brn_general_vector/brn_edit_viewer/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_bntl/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_security/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type: "arcgis"
  },
]