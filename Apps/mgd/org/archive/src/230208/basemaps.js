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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/izrlm_general_basemaps/izlrm_op_2020/MapServer',
      title_HE: `תצא 2020 יזרעאלים`,
      title_EN: 'Aerial Photo 2020',
      slug: 'izlrm_op_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mgd_general_basemaps/mgd_OP_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'mgd_OP_2020',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mgd_general_basemaps/mgd_orthophoto_2018_new/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'mgd_orthophoto_2018_new',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mgd_general_basemaps/mgd_orthophoto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'mgd_orthophoto_2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_ortophoto_2014_/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'sfr_ortophoto_2014_',
      projection: 'EPSG:2039'
    },
    {
      type: 'xyz',
      url: 'https://israelhiking.osm.org.il/Tiles/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `מפת הטיולים הפתוחה`,
      title_EN: 'Israel Hiking',
      slug: 'israel_hiking',
      attribution: '<ul><li>Tiles &copy;&nbsp;<a href="https://israelhiking.osm.org.il/" target="_blank" rel="nofollow">Israel Hiking</a>&nbsp;under&nbsp;<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="nofollow">CC BY-NC-SA 3.0</a></li><li>Map data &copy;&nbsp;<a href="https://openstreetmap.org/" target="_blank" rel="nofollow">OpenStreetMap</a>&nbsp;contributors under&nbsp;<a href="https://opendatacommons.org/licenses/odbl/summary/" target="_blank" rel="nofollow">ODbL</a></li></ul>',
      attribution_direction: 'LTR'
    },
  ]
}