export default [
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_General/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/arnona_general_vector/ren_sde_modedim/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_handasa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
    virtualGroup:"הנדסה - פרויקטים בביצוע",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_rakevet_kala/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/ren_general_vector/ren_mosdot_hinuh/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/ren_general_vector/rne_infra/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_raine/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_community/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_shefa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
    url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_bntl_symbol/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis"
  },
  {
  url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_properties/MapServer',
  export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis"
},
{
  url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_bntl_maagal/MapServer',
  export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis"
},
]