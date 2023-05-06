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
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Raster2008/MapServer',
      title_HE: `מפה סרוקה`,
      title_EN: 'Scanned Map',
      slug: 'Raster2008',
      projection: 'EPSG:2039'
    },
  ],
  arialmaps: [
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'Ortho_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Orthopoto_2020/Orthophoto_gln_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'Ortho_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'Ortho2018',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'Ortho2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho_2016/MapServer',
      title_HE: `תצ"א 2016 - 2`,
      title_EN: 'Aerial Photo 2016 - 2',
      slug: 'Ortho_2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'Ortho2013',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2012/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'Ortho2012',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2009/MapServer',
      title_HE: `תצ"א 2009`,
      title_EN: 'Aerial Photo 2009',
      slug: 'Ortho2009',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2007/MapServer',
      title_HE: `תצ"א 2007`,
      title_EN: 'Aerial Photo 2007',
      slug: 'Ortho2007',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho2005/MapServer',
      title_HE: `תצ"א 2005`,
      title_EN: 'Aerial Photo 2005',
      slug: 'Ortho2005',
      projection: 'EPSG:2039'
    },
	{
      url: 'https://gis.megolan.org.il/arcgis/rest/services/Ortho1999/MapServer',
      title_HE: `תצ"א 1999`,
      title_EN: 'Aerial Photo 1999',
      slug: 'Ortho1999',
      projection: 'EPSG:2039'
    }
  ]
}