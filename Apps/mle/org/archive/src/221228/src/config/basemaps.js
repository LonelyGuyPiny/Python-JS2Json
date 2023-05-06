export default {
  default_basemap: 'biy_orthophoto_2021',
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
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mle_general_basemaps/mle_city_map/MapServer',
      title_HE: `מפה תיירותית`,
      title_EN: 'Tourist Map',
      slug: 'mle_city_map',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/biy_general_basemaps/biy_op_2021/MapServer',
      title_HE: `תצ"א 2021 בקעת הירדן`,
      title_EN: 'Aerial Photo 2021',
      slug: 'biy_orthophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mle_general_basemaps/mle_orthophoto_2021/MapServer',
      title_HE: `תצ"א אוג' 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'mle_orthophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mle_general_basemaps/mle_op_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'mle_op_2019',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mle_general_basemaps/mle_orthophoto_2017big/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'mle_orthophoto_2017big',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mle_general_basemaps/mle_orthophoto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: `Aerial Photo 2016`,
      slug: 'mle_orthophoto_2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/mle_general_basemaps/mle_orthophoto_2012/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'mle_orthophoto_2012',
      projection: 'EPSG:2039'
    },
  ]
}