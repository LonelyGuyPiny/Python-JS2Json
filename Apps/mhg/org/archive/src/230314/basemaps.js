export default {
  default_basemap: 'osm_map',
  basemaps: [
		{
      type: 'xyz',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `OpenStreetMap`,
      title_EN: 'OpenStreetMap',
      slug: 'osm_map',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mhg_general_basemaps/mhg_vector_map/MapServer',
      title_HE: `מפת אינטרטאון - מרום הגליל`,
      title_EN: 'Merom HaGalil - Intertown Map',
      slug: 'mhg_vector_map',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mhg_general_basemaps/mhg_op_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'mhg_op_2018',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mhg_general_basemaps/mhg_orthophoto_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'mhg_orthophoto_2015',
      projection: 'EPSG:2039'
    },
  ]
}