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
  labelmap: { 
    type: 'label_arcgis',
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/krg_general_vector/krg_aerial_photos_labels/MapServer',
    defaultStatus: true,
    title_HE: `מפה וקטורית`,
    title_EN: 'Labels Map',
    slug: 'krg_aerial_photos_labels',
  },
  arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/kma_general__basemap/kma_op_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2019',
      slug: 'orthophoto_kma_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/krm_general_vector/krm_turisem_map/MapServer',
      title_HE: `מפת תיירות קרית מלאכי (ישנה) 2016`,
      title_EN: 'krm_turisem_map',
      slug: 'krm_turisem_map',
      projection: 'EPSG:2039'
    },
  ]
}