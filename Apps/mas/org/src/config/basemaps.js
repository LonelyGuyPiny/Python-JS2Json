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
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mgd_general_basemaps/mgd_vector_orthomap/MapServer',
    //   title_HE: `מפת אינטרטאון - מגידו`,
    //   title_EN: 'Megiddo - Intertown Map',
    //   slug: 'mgd_vector_orthomap',
    //   projection: 'EPSG:2039'
    // },
    // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mgd_general_basemaps/mgd_tourisem_basemap/MapServer',
    //   title_HE: `מפת המרחב הביוספרי מגידו`,
    //   title_EN: 'Meggido Biosphere Reserve Map',
    //   slug: 'mgd_tourisem_basemap',
    //   projection: 'EPSG:2039'
    // },
  ],
  arialmaps: [
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