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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/esk_general_basemap/esk_OP_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'esk_OP_2021',
      id: 1,
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/esk_general_basemap/esk_OP_2020_1/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'esk_OP_2020_1',
      id: 2,
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/esk_general_basemap/esk_OP_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'esk_OP_2015',
      id: 2,
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/esk_general_basemap/esk_orthophoto_2011/MapServer',
      title_HE: `תצ"א 2011`,
      title_EN: 'Aerial Photo 2011',
      slug: 'esk_orthphoto_2011',
      id: 2,
      projection: 'EPSG:2039'
    }, 
  ]
}