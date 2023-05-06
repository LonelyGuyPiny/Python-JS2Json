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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kdz_general_basemaps/kdz_vector_map/MapServer',
      title_HE: `מפת אינטרטאון - קדימה-צורן`,
      title_EN: 'Kadima-Zoran - Intertown Map',
      slug: 'kdz_vector_map',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kdz_general_basemaps/kdz_OP_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'kdz_OP_2020',
      projection: 'EPSG:2039',
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kdz_general_basemaps/kdz_OP_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'kdz_OP_2019',
      projection: 'EPSG:2039',
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kdz_general_basemaps/kdz_orthophoto_2017/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: `Aerial Photo 2017`,
      slug: 'kdz_orthophoto_2017',
      projection: 'EPSG:2039',
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kdz_general_basemaps/kdz_orthophoto_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'kdz_orthophoto_2014',
      projection: 'EPSG:2039',
    },
  ]
}