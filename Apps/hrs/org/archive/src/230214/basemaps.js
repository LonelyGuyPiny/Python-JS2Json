export default {
  default_basemap: 'hrs_Orthophoto_2021',
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
       url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_2021/MapServer',
       title_HE: `תצ"א 2021`,
       title_EN: 'Aerial Photo 2021',
       slug: 'hrs_Orthophoto_2021',
       projection: 'EPSG:2039'
     },
     {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_2019_V2/MapServer',
      title_HE: `תצ"א 2019 נובמבר`,
      title_EN: 'Aerial Photo 2019 November',
      slug: 'hrs_orthophoto_2019_V2',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_2019/MapServer',
      title_HE: `תצ"א 2019 ינואר`,
      title_EN: 'Aerial Photo 2019 January',
      slug: 'hrs_orthophoto_2019',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'hrs_orthophoto_2018',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'hrs_orthophoto_2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_07_2014/MapServer',
      title_HE: `תצ"א 2014 יולי`,
      title_EN: 'Aerial Photo 2014 July',
      slug: 'hrs_orthophoto_07_2014',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_04_2014/MapServer',
      title_HE: `תצ"א 2014 אפריל`,
      title_EN: 'Aerial Photo 2014 April',
      slug: 'hrs_orthophoto_04_2014',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/hrs_general_basemaps/hrs_orthophoto_2011/MapServer',
      title_HE: `תצ"א 2011`,
      title_EN: 'Aerial Photo 2011',
      slug: 'hrs_orthophoto_2011',
      projection: 'EPSG:2039'
    },
   ]
}