export default [
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_general_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  // {
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_general_layers_for_kabat/MapServer',
  //   export: ['kmz', 'GeoJSON', 'csv'],
    // exportKMZ: true, 
  //   exportCSV: true
  // },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_cadster_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_historical_cadaster/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_future_planning/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_yk_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_arnona_application/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_yk_plans/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_infrastructure/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bina_general_vector/kr8_Bina/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_irregularity/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_herum/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_city_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
  {
    type:"arcgis",
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_bntl_layers/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  },
]