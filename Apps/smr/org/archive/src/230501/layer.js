export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_yk_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_baaluyot_karka/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_ezr_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://services3.arcgis.com/JVKf7TPFiHabmA6m/ArcGIS/rest/services/smr_neighborhood_4edit_agol/FeatureServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis_feature',
    virtualGroup:"שכונות"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_infrastructures/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_transportation/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_tourism/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_security/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/yosh_minhal_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:'arcgis',
  },
]