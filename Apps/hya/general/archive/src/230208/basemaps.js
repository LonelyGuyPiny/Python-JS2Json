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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/srk_vector_map_new/MapServer',
      title_HE: `מפת אינטרטאון`,
      title_EN: 'Sorkot - Intertown Map',
      slug: 'srk_vector_map_new',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/srk_op_2021/MapServer',
      title_HE: `תצ"א 2021 (שורקות)`,
      title_EN: 'Aerial Photo 2020 (Sorkot)',
      slug: 'srk_op_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/srk_orthophoto_2020/MapServer',
      title_HE: `תצ"א 2020 (שורקות)`,
      title_EN: 'Aerial Photo 2020 (Sorkot)',
      slug: 'srk_orthophoto_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/srk_ortho_2019_1/MapServer',
      title_HE: `תצ"א 2019 (שורקות)`,
      title_EN: 'Aerial Photo 2019 (Sorkot)',
      slug: 'srk_ortho_2019_1',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/srk_orthophoto_2017/MapServer',
      title_HE: `תצ"א 2017 (שורקות)`,
      title_EN: 'Aerial Photo 2017 (Sorkot)',
      slug: 'srk_ortho_2017_1',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/srk_ortho_HevelYavne_2015/MapServer',
      title_HE: `תצ"א 2015 (שורקות)`,
      title_EN: 'Aerial Photo 2015 (Sorkot)',
      slug: 'srk_ortho_2015',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/srk_general_basemap/sorkot_orto_2014/MapServer',
      title_HE: `תצ"א 2014 (שורקות)`,
      title_EN: 'Aerial Photo 2014 (Sorkot)',
      slug: 'sorkot_orto_2014',
      projection: 'EPSG:2039'
    }
  ]
}