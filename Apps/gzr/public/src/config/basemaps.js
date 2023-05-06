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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_vector_map/MapServer',
      title_HE: `מפת אינטרטאון - גזר`,
      title_EN: 'Gezer - Intertown Map',
      slug: 'gzr_vector_map',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_bantal_basemap/MapServer',
      title_HE: `מפת בנט"ל`,
      title_EN: 'BANTAL Map',
      slug: 'gzr_bantal_basemap',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_ortophoto_2023/MapServer',
      title_HE: `תצ"א 2023`,
      title_EN: 'Aerial Photo 2023',
      slug: 'gzr_op_2023',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_orthophoto_20211/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'gzr_orthophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_orthophoto_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'gzr_orthophoto_2019',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_ortho_2019_trans50_comp/MapServer',
      title_HE: `תצ"א 2019 יעודי קרקע שקיפות`,
      title_EN: 'Aerial Photo 2019',
      slug: 'gzr_orthophoto_2019_2',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_orthophoto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'gzr_orthophoto_2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_orthophoto_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'gzr_orthophoto_2014',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gzr_general_basemaps/gzr_orthophoto_2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'gzr_orthophoto_2013',
      projection: 'EPSG:2039'
    }
  ]
}