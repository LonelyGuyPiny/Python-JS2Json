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
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_vector_map_1/MapServer',
      title_HE: `מפת אינטרטאון - שפיר`,
      title_EN: 'Shafir - Intertown Map',
      slug: 'sfr_vector_map_1',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_orthophoto_2021_2/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'sfr_ortophoto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_orthophoto_2021/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2021',
      slug: 'sfr_orthophoto_2021_1',
      projection: 'EPSG:2039'
    },
    {
   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_orthophoto_2019_1/MapServer',
    title_HE: `תצ"א 2019`,
    title_EN: 'Aerial Photo 2019',
    slug: 'sfr_orthophoto_2019_1',
    projection: 'EPSG:2039'
   },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_orthophoto_2017_2/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'sfr_orthophoto_2017_2',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_ortophoto_2014_/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'sfr_ortophoto_2014_',
      projection: 'EPSG:2039'
    },
	  {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/sfr_general_basemap/sfr_orthophoto_2012/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'sfr_orthophoto_2012',
      projection: 'EPSG:2039'
    },
  ]
}