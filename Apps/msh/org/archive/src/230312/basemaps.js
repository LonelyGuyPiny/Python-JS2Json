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
      attribution: '©<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
	},
  ],
  arialmaps: [
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msh_general_basemap/msh_KYona_op_2018/MapServer',
      title_HE: `תצ"א כפר יונה 2018`,
      title_EN: 'Aerial Photo 2021',
      slug: 'msh_KYona_op_2018',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msh_general_basemap/msh_op_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2020',
      slug: 'msh_op_2018',
      projection: 'EPSG:2039'
    },
    // {
    //   type: 'arcgis',
	  // url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/esk_general_basemap/esk_OP_2015/MapServer',
    //   title_HE: `תצ"א 2015`,
    //   title_EN: 'Aerial Photo 2015',
    //   slug: 'esk_OP_2015',
    //   projection: 'EPSG:2039'
    // },
    // {
    //   type: 'arcgis',
	  // url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/esk_general_basemap/esk_orthophoto_2011/MapServer',
    //   title_HE: `תצ"א 2011`,
    //   title_EN: 'Aerial Photo 2011',
    //   slug: 'esk_orthphoto_2011',
    //   projection: 'EPSG:2039'
    // }, 
  ]
}