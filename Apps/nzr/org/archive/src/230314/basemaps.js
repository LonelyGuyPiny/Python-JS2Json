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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nzr_general_basemap/nzr_op_2022/MapServer',
      title_HE: `תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'nzr_op_2022',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nzr_general_basemap/nzr_orthophoto_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'nzr_orthophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nzr_general_basemap/nzr_orthophoto_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'nzr_orthophoto_2018',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nzr_general_basemap/nzr_orthophoto_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'nzr_orthophoto_2015',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nzr_general_basemap/nzr_orthophoto_2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'nzr_orthophoto_2013',
      projection: 'EPSG:2039'
    },
  ]
}