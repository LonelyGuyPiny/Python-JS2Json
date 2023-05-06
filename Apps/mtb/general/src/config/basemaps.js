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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yosh_general_basemap/yosh2019_001/MapServer',
      title_HE: `אורתופוטו יו"ש 2019`,
      title_EN: 'yosh2019_001',
      slug: 'yosh2019_001',
      projection: 'EPSG:3857'
    },
  ],
  // labelmap: {
  //   url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/krg_general_vector/krg_aerial_photos_labels/MapServer',
  //   title_HE: `מפה וקטורית`,
  //   title_EN: 'Labels Map',
  //   slug: 'krg_aerial_photos_labels',
  // },
  arialmaps: [
    // {
    //   url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/yov_general_bsemaps/yov_orthophoto_2020/MapServer',
    //   title_HE: `תצ"א 2020`,
    //   title_EN: 'Aerial Photo 2019',
    //   slug: 'yov_orthophoto_2020',
    //   projection: 'EPSG:2039'
    // },

  ]
}