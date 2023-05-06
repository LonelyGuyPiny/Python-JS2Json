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
      attribution_direction: 'LTR',
    },
  ],
   arialmaps: [
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/shf_general_basemap/shf_orthophoto_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'shf_orthophoto_2021',
      projection: 'EPSG:2039'
    },
     {
       url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/shf_general_basemap/shk_orthophoto_2017/MapServer',
       title_HE: `תצ"א 2019`,
       title_EN: 'Aerial Photo 2017',
       slug: 'shk_orthophoto_2017',
       projection: 'EPSG:2039'
     },
     {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/shf_general_basemap/shf_orthophoto_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'shf_orthophoto_2014',
      projection: 'EPSG:2039'
    },
   ]
}