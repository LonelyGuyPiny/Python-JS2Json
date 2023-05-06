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
      attribution_direction: 'LTR',
    },
  ],
   arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/ksm_general_basemap/ksm_OP_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Orthophoto 2018',
      slug: 'ksm_OP_2018',
      projection: 'Transverse_Mercator',
      attribution_direction: 'RTL'
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