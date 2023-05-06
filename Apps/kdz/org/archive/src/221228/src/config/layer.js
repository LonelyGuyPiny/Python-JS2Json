export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_welfare/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_shefa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_handasa_projects/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_asset/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_cadaster/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_tamrur/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_infrastructure/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    virtualGroup: "מים",
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_WaterAsMade_Main_SDE/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    virtualGroup: "ביוב",
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_SawageASMade_Main_SDE/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    virtualGroup: "מקורות",
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msh_general_vector/msh_mekorot/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_BNTL/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis'
  },
]