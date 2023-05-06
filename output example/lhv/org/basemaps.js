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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_vector_map1/MapServer',
      title_HE: `מפת אינטרטאון`,
      title_EN: 'Intertown Map',
      slug: 'lhv_vector_map1',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_op_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'lhv_op_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_ortho_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: `Aerial Photo 2018`,
      slug: 'lhv_ortho_2018',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2017_periphera/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'lhv_orthophoto_2017_periphera',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'lhv_orthophoto_2015',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'lhv_orthophoto_2014',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2012/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'lhv_orthophoto_2012',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2010/MapServer',
      title_HE: `תצ"א 2010`,
      title_EN: 'Aerial Photo 2010',
      slug: 'lhv_orthophoto_2010',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2007/MapServer',
      title_HE: `תצ"א 2007`,
      title_EN: 'Aerial Photo 2007',
      slug: 'lhv_orthophoto_2007',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2006/MapServer',
      title_HE: `תצ"א 2006`,
      title_EN: 'Aerial Photo 2006',
      slug: 'lhv_orthophoto_2006',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2005/MapServer',
      title_HE: `תצ"א 2005`,
      title_EN: 'Aerial Photo 2005',
      slug: 'lhv_orthophoto_2005',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/lhv_general_basemaps/lhv_orthophoto_2003/MapServer',
      title_HE: `תצ"א 2003`,
      title_EN: 'Aerial Photo 2003',
      slug: 'lhv_orthophoto_2003',
      projection: 'EPSG:2039'
    },  
  ]
}