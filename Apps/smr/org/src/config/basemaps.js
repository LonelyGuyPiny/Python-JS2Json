export default {
  default_basemap: 'yosh_orthophoto_2022',
  basemaps: [
		{
      type: 'xyz',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `מפה`,
      title_EN: 'OpenStreetMap',
      slug: 'osm_map',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
    },
    // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gue_general_basemaps/gue_vector_orthomap/MapServer',
    //   title_HE: `מפת אינטרטאון - גוש עציון`,
    //   title_EN: 'Gush Etzion - Intertown Map',
    //   slug: 'gue_vector_orthomap',
    //   projection: 'EPSG:2039'
    // },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh_op_2022/MapServer',
      title_HE: 'תצ"א 2022',
      title_EN: 'Aerial Photo 2021',
      slug: 'yosh_orthophoto_2022',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh_op_2021/MapServer',
      title_HE: 'תצ"א 2021',
      title_EN: 'Aerial Photo 2021',
      slug: 'yosh_op_2021',
      projection: 'EPSG:2039'
    },
    // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/Ortophoto_yosh_2021/MapServer',
    //   title_HE: `תצ"א 2021  `,
    //   title_EN: 'Aerial Photo 2021  ',
    //   slug: 'Ortophoto_yosh_2021 ',
    //   projection: 'EPSG:2039'
    // },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/Yosh2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'yosh_general_basemap',
      projection: 'EPSG:2039'
    },
	  // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gue_general_basemaps/gue_orthophoto_2017/MapServer',
    //   title_HE: `תצ"א 2017`,
    //   title_EN: 'Aerial Photo 2017',
    //   slug: 'gue_orthophoto_2017',
    //   projection: 'EPSG:2039'
    // },
	  // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/gue_general_basemaps/gue_orthophoto_male/MapServer',
    //   title_HE: `תצ"א 2016`,
    //   title_EN: 'Aerial Photo 2016',
    //   slug: 'gue_orthophoto_male',
    //   projection: 'EPSG:2039'
    // },
    // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/eft_general_vector/eft_orthophoto_2020/MapServer',
    //   title_HE: `תצ"א אפרת 2020`,
    //   title_EN: 'Aerial Photo 2016',
    //   slug: 'eft_orthophoto_2020',
    //   projection: 'EPSG:2039'
    // },
  ]
}