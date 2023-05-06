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
    }
  ],
   arialmaps: [
    {
      type: 'arcgis', 
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mzr_general_basemap/mzr_op_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'mzr_op_2021',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis', 
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mzr_general_basemap/mzr_op_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'mzr_op_2020',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mzr_general_basemap/mzr_op_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'mzr_op_2019',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mzr_general_basemap/mzr_op_2017/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'mzr_op_2017',
      projection: 'EPSG:2039'
    },
    // {
    //   type: 'arcgis',
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mzr_general_basemap/mzr_op_1975/MapServer',
    //   title_HE: `תצ"א 1975`,
    //   title_EN: 'Aerial Photo 1975',
    //   slug: 'mzr_op_1975',
    //   projection: 'EPSG:2039'
    // },
    {
      url: 'https://tiles.arcgis.com/tiles/JcXY3lLZni6BK4El/arcgis/rest/services/%D7%AA%D7%A6%D7%9C%D7%95%D7%9D_%D7%90%D7%95%D7%95%D7%99%D7%A8_2015/MapServer',
      title_HE: `תצ"א 2015 - ארצי מפ"י`,
      title_EN: 'Aerial Photo 2010 - Israel',
      slug: 'israel_2015',
      projection: 'EPSG:3857',
      attribution: '<p dir="auto">תצלום אויר 2015 2 מטר, המרכז למיפוי ישראל <br/> מבוסס על נתונים מתוך אתר מאגרי המידע הממשלתיים <a href="https://data.gov.il" target="_blank">data.gov.il</a></p>      ',
      attribution_direction: 'RTL'
    },
    // {
    //   type: 'arcgis',
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/k8_orthophoto_2015/MapServer',
    //   title_HE: `תצ"א 2015`,
    //   title_EN: 'Aerial Photo 2015',
    //   slug: 'k8_orthophoto_2015',
    //   projection: 'EPSG:2039'
    // },
    // {
    //   type: 'arcgis',
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/kr8_orthphoto_2011/MapServer',
    //   title_HE: `תצ"א 2011`,
    //   title_EN: 'Aerial Photo 2011',
    //   slug: 'kr8_orthphoto_2011',
    //   projection: 'EPSG:2039'
    // },
    // {
    //   type: 'arcgis',
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/KR8_op_619_1995/MapServer',
    //   title_HE: `תצ"א 1979_1`,
    //   title_EN: 'Aerial Photo 1979',
    //   slug: 'kr8_historic_orthophoto_1979_1',
    //   projection: 'EPSG:2039'
    // },
    // {
    //   type: 'arcgis',
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/KR8_op_619_2031/MapServer',
    //   title_HE: `תצ"א 1979_2`,
    //   title_EN: 'Aerial Photo 1979',
    //   slug: 'kr8_historic_orthophoto_1979_2',
    //   projection: 'EPSG:2039'
    // },
   ]
}