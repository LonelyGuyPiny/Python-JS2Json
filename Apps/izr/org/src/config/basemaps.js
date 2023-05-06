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
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/izr_general_basemaps/izr_op_2022temp/MapServer',
      title_HE: `תצ"א זמני 2022 עמק יזרעאל`,
      title_EN: 'Aerial Photo 2020',
      slug: 'izr_op_2022temp',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/izrlm_general_basemaps/izlrm_op_2020/MapServer',
      title_HE: `תצא 2020 יזרעאלים`,
      title_EN: 'Aerial Photo 2020',
      slug: 'izlrm_op_2020',
      projection: 'EPSG:2039'
    },
  ]
}