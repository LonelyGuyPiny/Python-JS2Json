export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_general_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_the100plan/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_yk_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_arnona/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/arnona_general_vector/kr4_sde_modedim/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup: "מדידות ארנונה",
  },
  {
    url: 'https://stage1.intertown.co.il/arcgis/rest/services/kr4_general_vector/kr4_Infrastructure_layers1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/krb_tachsit/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_taldor_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_bitahon/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/yosh_minhal_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_bntl/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_whats_here_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
]