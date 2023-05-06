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
      id: 1,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR',
    },
	// {
  //     url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/Yosh2019/MapServer',
  //     title_HE: `מפת אינטרטאון`,
  //     title_EN: 'Intertown Map',
  //     slug: 'lhv_vector_map1',
  //     id: 2,
  //     projection: 'EPSG:2039'
  //   },
  ],
  arialmaps: [
    {
      id: 3,
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hhv_general_basemaps/hhv_op_2023/MapServer',
      title_HE: ` תצ"א 2023`,
      title_EN: 'Aerial Photo 2023',
      slug: 'hhv_op_2023',
      projection: 'EPSG:2039',
    },
    {
      id: 3,
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh_op_2022/MapServer',
      title_HE: ` תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'yosh_op_2022',
      projection: 'EPSG:2039',
    },
    {
      id: 3,
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh_op_2021/MapServer',
      title_HE: ` תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'yosh_op_2021',
      projection: 'EPSG:2039',
    },
    {
      id: 3,
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/Yosh2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'Yosh2019',
      projection: 'EPSG:2039',
    },
    {
      id: 3,
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hhv_general_basemaps/hhv_orthophoto_2017/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'Yosh2017',
      projection: 'EPSG:2039',
    },
    {
      id: 3,
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hhv_general_basemaps/hhv_ortophoto_2016_sep/MapServer',
      title_HE: ` תצ"א 2016 `,
      title_EN: 'Aerial Photo 2016',
      slug: 'Yosh2016',
      projection: 'EPSG:2039',
    },  
  ]
}