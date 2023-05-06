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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_vector_map/MapServer',
      title_HE: `מפת אינטרטאון - יואב`,
      title_EN: 'Yoav - Intertown Map',
      slug: 'yov_vector_map',
      projection: 'EPSG:2039'
    },
  ],
  // labelmap: {
  //   type: 'label_arcgis',
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/krg_general_vector/krg_aerial_photos_labels/MapServer',
  //   slug: 'krg_aerial_photos_labels',
  //   defaultStatus: false,
  // },
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_op_2021_1/MapServer',
      title_HE: `תצ"א 2021 מתוקנת`, 
      title_EN: 'Aerial Photo 2021',
      slug: 'yov_op_2021_1',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_orthophoto_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'yov_orthophoto_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_orthophoto_2019_8/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'yov_orthophoto_2019_8',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_ortophoto__2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'yov_ortophoto__2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_orthophoto_2008_1/MapServer/',
      title_HE: `תצ"א 2008 (ישובים בלבד)`,
      title_EN: 'Aerial Photo 2008 (Settlements Only)',
      slug: 'yov_orthophoto_2008_1',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_ypark/MapServer',
      title_HE: `מפת YPARK`,
      title_EN: 'YPARK MAP',
      slug: 'YPARK MAP',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_SdeYoav_orthophotho/MapServer',
      title_HE: `תצ"א שדה יואב 2022`,
      title_EN: 'YPARK MAP',
      slug: 'yov_SdeYoav_orthophotho',
      projection: 'EPSG:2039'
    }
  ]
}