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
    }
  ],
   arialmaps: [
    {
      type: 'arcgis', 
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/kr8_op_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'kr8_op_2021',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis', 
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/kr8_orthophoto_2019_14/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'kr8_orthophoto_2019_14',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/kr8_orthophoto_2017_1/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'kr8_orthophoto_2017_1',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/k8_orthophoto_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'k8_orthophoto_2015',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/kr8_orthphoto_2011/MapServer',
      title_HE: `תצ"א 2011`,
      title_EN: 'Aerial Photo 2011',
      slug: 'kr8_orthphoto_2011',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/1990_m/MapServer',
      title_HE: `תצ"א 1990_1`,
      title_EN: 'Aerial Photo 1979',
      slug: '1990_m',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/1990/MapServer',
      title_HE: `תצ"א 1990_2`,
      title_EN: 'Aerial Photo 1979',
      slug: '1990',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/1982_m/MapServer',
      title_HE: `תצ"א 1982_1`,
      title_EN: 'Aerial Photo 1979',
      slug: '1982_m',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/1982/MapServer',
      title_HE: `תצ"א 1982_2`,
      title_EN: 'Aerial Photo 1979',
      slug: '1982',
      projection: 'EPSG:2039'
    },	
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/KR8_op_619_1995/MapServer',
      title_HE: `תצ"א 1979_1`,
      title_EN: 'Aerial Photo 1979',
      slug: 'kr8_historic_orthophoto_1979_1',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kr8_general_basemap/KR8_op_619_2031/MapServer',
      title_HE: `תצ"א 1979_2`,
      title_EN: 'Aerial Photo 1979',
      slug: 'kr8_historic_orthophoto_1979_2',
      projection: 'EPSG:2039'
    },
   ]
}