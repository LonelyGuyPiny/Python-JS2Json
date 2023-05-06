export default {
  default_basemap: 'osm_map',
  basemaps: [
	{
      type: 'xyz',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `מפת OSM`,
      title_EN: 'Open Street Map',
      slug: 'osm_map',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
    }
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mnm_general_basemaps/mnm_op_2023_afl/MapServer',
      title_HE: `תצ"א 2023 (עפולה)`,
      title_EN: 'Aerial Photo 2023',
      slug: 'mnm_op_2023_afl',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mnm_general_basemaps/mnm_mgdlhemek_op_2022/MapServer',
      title_HE: `תצ"א 2022 (מגדל העמק)`,
      title_EN: 'Aerial Photo 2022',
      slug: 'mnm_mgdlhemek_op_2022',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nzr_general_basemap/nzr_orthophoto_2021/MapServer',
      title_HE: `תצ"א 2021 (נוף הגליל)`,
      title_EN: 'Aerial Photo 2021',
      slug: 'nzr_orthophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://tiles.arcgis.com/tiles/JcXY3lLZni6BK4El/arcgis/rest/services/%D7%AA%D7%A6%D7%9C%D7%95%D7%9D_%D7%90%D7%95%D7%95%D7%99%D7%A8_2015/MapServer',
      title_HE: `תצ"א 2015 - ארצי מפ"י`,
      title_EN: 'Aerial Photo 2010 - Israel',
      slug: 'israel_2015',
      projection: 'EPSG:3857',
      attribution: '<p dir="auto">תצלום אויר 2015 2 מטר, המרכז למיפוי ישראל <br/> מבוסס על נתונים מתוך אתר מאגרי המידע הממשלתיים <a href="https://data.gov.il" target="_blank">data.gov.il</a></p>      ',
      attribution_direction: 'RTL'
    },
  ]
}