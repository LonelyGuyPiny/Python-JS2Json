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
	// {
  //     url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kdz_general_basemaps/kdz_vector_map/MapServer',
  //     title_HE: `מפת אינטרטאון - קדימה-צורן`,
  //     title_EN: 'Kadima-Zoran - Intertown Map',
  //     slug: 'kdz_vector_map',
  //     projection: 'EPSG:2039'
  //   },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hvm_general_basemap/hvm_op_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'kdz_orthophoto_2020',
      projection: 'EPSG:2039',
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hvm_general_basemap/hvm_op_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'hvm_op_2018',
      projection: 'EPSG:2039',
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hvm_general_basemap/hvm_OP_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: `Aerial Photo 2015`,
      slug: 'hvm_OP_2015',
      projection: 'EPSG:2039',
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hvm_general_basemap/hvn_op_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'hvn_op_2014',
      projection: 'EPSG:2039',
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hvm_general_basemap/hvm_OP_2012/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'hvm_OP_2012',
      projection: 'EPSG:2039',
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hvm_general_basemap/hvm__op__2010/MapServer',
      title_HE: `תצ"א 2010`,
      title_EN: 'Aerial Photo 2012',
      slug: 'hvm__op__2010',
      projection: 'EPSG:2039',
    },
  ]
}