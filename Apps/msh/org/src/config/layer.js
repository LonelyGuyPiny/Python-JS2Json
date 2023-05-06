export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_bntl_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"כללי"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_feedback_from_client_SDE/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"בקרת איכות"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_Bakashot_Meida_SDE/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"בקשות מידע"
  }, {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_mekorot/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"רשת המים"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_WaterAsMade_Main_SDE/FeatureServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"קווי מים ממפות עדות"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_SawageASMade_Main_SDE/MapServer',
   export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"קווי ביוב ממפות עדות"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_Reka/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"רקע"
  },
 
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_main_lines/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"קווי ביוב ומים"
  },
  
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_index_medidot/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"אינדקס מדידות"
  },
 
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_cadaster/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"קדסטר"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_Maintenance_SDE/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"שכבות אחזקה"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_herum/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
    virtualGroup: "מינהל התכנון - תוכניות מקוונות"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_UnopenManholes_SDE/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
   virtualGroup:"שוחות שלא נפתחו"
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_EvenYehuda_FieldSurvey/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
   type:"arcgis",
  virtualGroup:"סקר שטח-אבן יהודה"
  },
  
]