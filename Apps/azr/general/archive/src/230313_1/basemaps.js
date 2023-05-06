export default {
  default_basemap: 'azr_op_2022',
  basemaps: [
	{
    type: 'xyz',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    title_HE: `OpenStreetMap`,
    title_EN: 'OpenStreetMap',
    slug: 'osm_map',
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    attribution_direction: 'LTR'
    },
	{
	type: 'arcgis',
	url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_vector_map1/MapServer',
    title_HE: `מפת אינטרטאון - אזור`,
    title_EN: 'Azur - Intertown Map',
    slug: 'azr_vector_map1',
    projection: 'EPSG:2039'
    },
  ],
  labelmap: {
    type: 'label_arcgis',
	url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_ortophoto_lables/MapServer',
    defaultStatus: true,
  },
arialmaps: [
  {
    type: 'arcgis',
  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_op_2022/MapServer',
    title_HE: `תצ"א 2022 - צולם ב-12/11/22`,
    title_EN: 'Aerial Photo 2022',
    slug: 'azr_op_2022',
    projection: 'EPSG:2039',
  },
	{
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_orthophoto_2021/MapServer',
      title_HE: `תצ"א 2021 - צולם ב-22/01/21`,
      title_EN: 'Aerial Photo 2021',
      slug: 'azr_orthophoto_2021',
      projection: 'EPSG:2039',
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_orthophoto_2020_1/MapServer',
      title_HE: `תצ"א 2020 - צולם ב-25/03/20`,
      title_EN: 'Aerial Photo 2020',
      slug: 'azr_orthophoto_2020_1',
      projection: 'EPSG:2039',
  },
          {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_ortophoto_2019/MapServer',
      title_HE: `תצ"א 2019 - צולם ב-09/03/19`,
      title_EN: `Aerial Photo 2019`,
      slug: 'azr_ortophoto_2019',
      projection: 'EPSG:2039',
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_ortophoto_2017/MapServer',
      title_HE: `תצ"א 2017 - צולם ב-08/05/17`,
      title_EN: 'Aerial Photo 2017',
      slug: 'azr_ortophoto_2017',
      projection: 'EPSG:2039',
    },
	{
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/azr_general_basemaps/azr_ortophoto_2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'azr_ortophoto_2013',
      projection: 'EPSG:2039'
    },
]
}