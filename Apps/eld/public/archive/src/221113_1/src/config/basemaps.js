export default {
  default_basemap: 'eld_op_2021',
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
  // labelmap: {
  //   url: '',
  //   title_HE: `תוויות`,
  //   title_EN: 'Labels Map',
  //   slug: '',
  //   projection: 'EPSG:2039'
  // },
  arialmaps: [
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/eld_general_basemap/eld_op_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'eld_op_2021',
      projection: 'EPSG:2039',
	    // attribution: ''
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/eld_general_basemap/eld_op_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'eld_orthophoto_2020',
      projection: 'EPSG:2039',
	    // attribution: ''
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/eld_general_basemap/eld_orthophoto_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'eld_orthophoto_2019',
      projection: 'EPSG:2039',
	    // attribution: ''
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/eld_general_basemap/eld_orthophoto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: `Aerial Photo 2016`,
      slug: 'eld_orthophoto_2016',
      projection: 'EPSG:2039',
	    // attribution: ''
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/eld_general_basemap/eld_orthophoto_2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'eld_orthophoto_2013',
      projection: 'EPSG:2039',
	    // attribution: ''
    },
  ]
}