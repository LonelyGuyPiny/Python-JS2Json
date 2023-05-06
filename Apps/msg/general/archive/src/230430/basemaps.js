export default {
  default_basemap: 'msg_op_2022FIX',
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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_op_2022FIX/MapServer',
      title_HE: `תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'msg_op_2022FIX',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_op_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2022',
      slug: 'msg_op_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_orthophoto_2k19/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'msg_orthophoto_2k19',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_orthphoto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'msg_orthphoto_2016',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_orthophoto_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'msg_orthophoto_2014',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_orthopoto_2012_1/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'msg_orthopoto_2012_1',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/msg_general_basemap/msg_orthophoto_2010_1/MapServer',
      title_HE: `תצ"א 2010`,
      title_EN: 'Aerial Photo 2010',
      slug: 'msg_orthophoto_2010_1',
      projection: 'EPSG:2039'
    }
  ]
}