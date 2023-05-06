export default {
  default_basemap: 'osm_map',
  basemaps: [
	{
      type: 'xyz',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `מפת OSM`,
      title_EN: 'Open Street Map',
      slug: 'osm_map',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
    }
  ],
  arialmaps: [
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2022/MapServer',
      title_HE: `תצ"א 2022`,
      title_EN: 'Aerial Photo 2022',
      slug: 'mavo_orto_2022',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2021/MapServer',
      title_HE: `תצ"א 2021`,
      title_EN: 'Aerial Photo 2021',
      slug: 'mavo_orto_2021',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://arcgis2.intertown.co.il/arcgis/rest/services/rna_general_basemap/rna_orthophoto_april_2020/MapServer',
      title_HE: `תצ"א 2020`,
      title_EN: 'Aerial Photo 2020',
      slug: 'rna_orthophoto_april_2020',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2019/MapServer',
      title_HE: `תצ"א 2019`,
      title_EN: 'Aerial Photo 2019',
      slug: 'mavo_orto_2019',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2018/MapServer',
      title_HE: `תצ"א 2018`,
      title_EN: 'Aerial Photo 2018',
      slug: 'mavo_orto_2018',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2017/MapServer',
      title_HE: `תצ"א 2017`,
      title_EN: 'Aerial Photo 2017',
      slug: 'mavo_orto_2017',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2016/MapServer',
      title_HE: `תצ"א 2016`,
      title_EN: 'Aerial Photo 2016',
      slug: 'mavo_orto_2016',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2015/MapServer',
      title_HE: `תצ"א 2015`,
      title_EN: 'Aerial Photo 2015',
      slug: 'mavo_orto_2015',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2014/MapServer',
      title_HE: `תצ"א 2014`,
      title_EN: 'Aerial Photo 2014',
      slug: 'mavo_orto_2014',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2013/MapServer',
      title_HE: `תצ"א 2013`,
      title_EN: 'Aerial Photo 2013',
      slug: 'mavo_orto_2013',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2012/MapServer',
      title_HE: `תצ"א 2012`,
      title_EN: 'Aerial Photo 2012',
      slug: 'mavo_orto_2012',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2011/MapServer',
      title_HE: `תצ"א 2011`,
      title_EN: 'Aerial Photo 2011',
      slug: 'mavo_orto_2011',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2010/MapServer',
      title_HE: `תצ"א 2010`,
      title_EN: 'Aerial Photo 2010',
      slug: 'mavo_orto_2010',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2009/MapServer',
      title_HE: `תצ"א 2009`,
      title_EN: 'Aerial Photo 2009',
      slug: 'mavo_orto_2009',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2008/MapServer',
      title_HE: `תצ"א 2008`,
      title_EN: 'Aerial Photo 2008',
      slug: 'mavo_orto_2008',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2007/MapServer',
      title_HE: `תצ"א 2007`,
      title_EN: 'Aerial Photo 2007',
      slug: 'mavo_orto_2007',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_2006/MapServer',
      title_HE: `תצ"א 2006`,
      title_EN: 'Aerial Photo 2006',
      slug: 'mavo_orto_2006',
      projection: 'EPSG:2039'
    },
    {
      url: 'https://gis.mavo.co.il/arcgis/rest/services/mavo_orto_raine1965/MapServer',
      title_HE: `תצ"א 1965`,
      title_EN: 'Aerial Photo 1965',
      slug: 'mavo_orto_raine1965',
      projection: 'EPSG:2039'
    },
  ]
}