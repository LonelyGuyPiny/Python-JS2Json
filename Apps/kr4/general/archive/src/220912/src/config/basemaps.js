export default {
  default_basemap: 'yosh_op_2022',
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
    }
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh_op_2022/MapServer',
      title_HE: `תצ"א יו"ש 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'yosh_op_2022',
      projection: 'EPSG:2039'
    },
    // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr4_general_basemaps/kr4_orthophoto_2020/MapServer',
    //   title_HE: `תצ"א 2020`,
    //   title_EN: 'Aerial Photo 2020',
    //   slug: 'kr4_orthophoto_2020',
    //   projection: 'EPSG:2039'
    // },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh_op_2021/MapServer',
      title_HE: `תצ"א חדשה 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'yosh_op_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/Ortophoto_yosh_2021/MapServer',
      title_HE: `תצ"א יו"ש 2020`,
      title_EN: 'Aerial Photo 2021',
      slug: 'Ortophoto_yosh_2021',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/Yosh2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'Yosh2019',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr4_general_basemaps/krb_orthophoto_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: `Aerial Photo 2018`,
      slug: 'krb_orthophoto_2018',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr4_general_basemaps/krb_orthophoto_2016_new/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'krb_orthophoto_2016_new',
      projection: 'EPSG:2039'
    },
  ]
}