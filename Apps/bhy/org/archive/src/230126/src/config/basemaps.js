export default {
  default_basemap: 'osm_map',
  basemaps: [
	{
      type: 'xyz',
	  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      title_HE: `מפת OSM`,
      title_EN: 'Open Street Map',
      slug: 'osm_map',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
    }
  ],
  arialmaps: [
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/biy_general_basemaps/biy_op_2022/MapServer',
      title_HE: `תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'biy_op_2022',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/biy_general_basemaps/biy_op_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'biy_orthophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/biy_general_basemaps/biy_orthophoto_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'biy_orthophoto_2019',
      projection: 'EPSG:2039'
    },
  ]
}