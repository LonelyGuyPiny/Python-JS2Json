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
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nsr_general_basemaps/nsr_op_2022/MapServer',
      title_HE: `תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'nsr_op_2022',
      projection: 'EPSG:2039'
    },
     {
       url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nsr_general_basemaps/nsr_op_2020_2/MapServer',
       title_HE: `תצ"א 2020`,
       title_EN: 'Aerial Photo 2020',
       slug: 'nsr_op_20200607',
       projection: 'EPSG:2039'
     },
     {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/nsr_general_basemaps/nsr_orthophoto_2014_1/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'nsr_orthophoto_2014_1',
      projection: 'EPSG:2039'
    },
   ]
}