export default {
  default_basemap: 'btv_op_2022',
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
    }
  ],
  labelmap: {
    type: 'label_arcgis',
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/btv_general_vector/btv_general_only_lables/MapServer',
    defaultStatus: false
  },
   arialmaps: [
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/btv_general_basemaps/btv_op_2022/MapServer',
      title_HE: `תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'btv_op_2022',
      projection: 'EPSG:2039'
    },
     {
       type: 'arcgis',
	   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/btv_general_basemaps/btv_orthophoto_2018_1/MapServer',
       title_HE: `תצ"א 2018`,
       title_EN: 'Aerial Photo 2018',
       slug: 'btv_orthophoto_2018_1',
       projection: 'EPSG:2039'
     },
     {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/btv_general_basemaps/btv_orthophoto_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'btv_orthophoto_2015',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/btv_general_basemaps/btv_orthophoto_2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'btv_orthophoto_2013',
      projection: 'EPSG:2039'
    },
    {
      type: 'arcgis',
	  url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/btv_general_basemaps/btv_orthophoto_2011_1/MapServer',
      title_HE: `תצ"א 2011`,
      title_EN: 'Aerial Photo 2011',
      slug: 'btv_orthophoto_2011_1',
      projection: 'EPSG:2039'
    },
   ]
}