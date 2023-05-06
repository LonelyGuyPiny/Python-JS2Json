export default {
  default_basemap: 'osm_map',
   basemaps: [
    {
      type: 'xyz',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `מפה קלאסית`,
      title_EN: 'Classic Map',
      slug: 'osm_map',
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      attribution_direction: 'LTR'
    },
    // {
    //   type: 'xyz',
    //   url: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    //   title_HE: `מפה פשוטה`,
    //   title_EN: 'Simple Map',
    //   slug: 'carto_voyager',
    //   projection: 'EPSG:3857',
    //   attribution: '<p>&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap&nbsp;</a>contributors, &copy;&nbsp;<a href="https://carto.com/about-carto/" target="_blank">CARTO</a></p>',
    //   attribution_direction: 'LTR'
    // },
    // {
    //   type: 'xyz',
    //   url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    //   title_HE: `מפה בהירה`,
    //   title_EN: 'Bright Map',
    //   slug: 'light_all',
    //   projection: 'EPSG:3857',
    //   attribution: '<p>&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap&nbsp;</a>contributors, &copy;&nbsp;<a href="https://carto.com/about-carto/" target="_blank">CARTO</a></p>',
    //   attribution_direction: 'LTR'
    // },
    // {
    //   type: 'xyz',
    //   url: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    //   title_HE: `מפה כהה`,
    //   title_EN: 'Dark Map',
    //   slug: 'dark_all',
    //   projection: 'EPSG:3857',
    //   attribution: '<p>&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap&nbsp;</a>contributors, &copy;&nbsp;<a href="https://carto.com/about-carto/" target="_blank">CARTO</a></p>',
    //   attribution_direction: 'LTR'
    // },
    // {
    //   type: 'xyz',
    //   url: 'http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}',
    //   title_HE: `גוגל - מפת דרכים`,
    //   title_EN: 'Google - Road Map',
    //   slug: 'goolge_roadmap',
    //   projection: 'EPSG:3857',
    // },
    // {
    //   type: 'xyz',
    //   url: 'http://mt0.google.com/vt/lyrs=p&hl=he&x={x}&y={y}&z={z}',
    //   title_HE: `גוגל - פני השטח`,
    //   title_EN: 'Google - Terrain',
    //   slug: 'goolge_terrain',
    //   projection: 'EPSG:3857',
    // },
    {
      type: 'xyz',
      url: 'https://israelhiking.osm.org.il/Tiles/{z}/{x}/{y}.png',
      projection: 'EPSG:3857',
      title_HE: `מפת הטיולים הפתוחה`,
      title_EN: 'Israel Hiking',
      slug: 'israel_hiking',
      attribution: '<ul><li>Tiles &copy;&nbsp;<a href="https://israelhiking.osm.org.il/" target="_blank" rel="nofollow">Israel Hiking</a>&nbsp;under&nbsp;<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="nofollow">CC BY-NC-SA 3.0</a></li><li>Map data &copy;&nbsp;<a href="https://openstreetmap.org/" target="_blank" rel="nofollow">OpenStreetMap</a>&nbsp;contributors under&nbsp;<a href="https://opendatacommons.org/licenses/odbl/summary/" target="_blank" rel="nofollow">ODbL</a></li></ul>',
      attribution_direction: 'LTR'
    },
  ],
  arialmaps: [
    {
      type: 'wmts',
      url: 'https://s2maps-tiles.eu/wmts/1.0.0/WMTSCapabilities.xml',
      title_HE: `תצ"א 2020 - עולמי סנטינל2`,
      title_EN: 'Aerial Photo 2020 - Sentinel2',
      slug: '2',
      layer: 's2cloudless-2020_3857',
      attribution: '<p><a class="a-light" href="https://s2maps.eu" target="_blank" rel="noopener noreferrer">Sentinel-2 cloudless 2020</a> by <a class="a-light" href="https://eox.at" target="_blank" rel="cc:attributionURL">EOX IT Services GmbH</a> is licensed under a <a class="a-light" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</p>',
      projection: 'EPSG:3857'
    },
    {
      type: 'wmts',
      url: 'https://s2maps-tiles.eu/wmts/1.0.0/WMTSCapabilities.xml',
      title_HE: `תצ"א 2019 - עולמי סנטינל2`,
      title_EN: 'Aerial Photo 2019 - Sentinel2',
      slug: '3',
      layer: 's2cloudless-2019_3857',
      attribution: '<p><a class="a-light" href="https://s2maps.eu" target="_blank" rel="noopener noreferrer">Sentinel-2 cloudless 2019</a> by <a class="a-light" href="https://eox.at"  target="_blank" rel="cc:attributionURL">EOX IT Services GmbH</a> is licensed under a <a class="a-light" href="https://creativecommons.org/licenses/by-nc-sa/4.0/"  target="_blank" rel="license">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</p>',
      projection: 'EPSG:3857'
    },
    {
      type: 'wmts',
      url: 'https://s2maps-tiles.eu/wmts/1.0.0/WMTSCapabilities.xml',
      title_HE: `תצ"א 2018 - עולמי סנטינל2`,
      title_EN: 'Aerial Photo 2018 - Sentinel2',
      slug: '4',
      layer: 's2cloudless-2018_3857',
      attribution: '<p><a class="a-light" href="https://s2maps.eu" target="_blank" rel="noopener noreferrer">Sentinel-2 cloudless 2018</a> by <a class="a-light" href="https://eox.at" target="_blank" rel="cc:attributionURL">EOX IT Services GmbH</a> is licensed under a <a class="a-light" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.</p>',
      projection: 'EPSG:3857'
    },
    {
      type: 'wmts',
      url: 'https://s2maps-tiles.eu/wmts/1.0.0/WMTSCapabilities.xml',
      title_HE: `תצ"א 2016 - עולמי סנטינל2`,
      title_EN: 'Aerial Photo 2016 - Sentinel2',
      slug: '5',
      layer: 's2cloudless_3857',
      attribution: '<p><a class="a-light" href="https://s2maps.eu" target="_blank" rel="noopener noreferrer">Sentinel-2 cloudless 2016</a> by <a class="a-light" href="https://eox.at" target="_blank" rel="cc:attributionURL">EOX IT Services GmbH</a> is licensed under a <a class="a-light" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="license">Creative Commons Attribution 4.0 International License</a>.</p>',
      projection: 'EPSG:3857'
    },
    {
      url: 'https://tiles.arcgis.com/tiles/JcXY3lLZni6BK4El/arcgis/rest/services/%D7%AA%D7%A6%D7%9C%D7%95%D7%9D_%D7%90%D7%95%D7%95%D7%99%D7%A8_2015/MapServer',
      title_HE: `תצ"א 2015 - ארצי מפ"י`,
      title_EN: 'Aerial Photo 2010 - Israel',
      slug: 'israel_2015',
      projection: 'EPSG:3857',
      attribution: '<p dir="auto">תצלום אויר 2015 2 מטר, המרכז למיפוי ישראל <br/> מבוסס על נתונים מתוך אתר מאגרי המידע הממשלתיים <a href="https://data.gov.il" target="_blank">data.gov.il</a></p>      ',
      attribution_direction: 'RTL'
    },
    {
      type: 'wmts',
      url: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?SERVICE=WMTS&request=GetCapabilities',
      title_HE: `תצ"א - עולמי נאסא`,
      title_EN: 'Aerial Photo - NASA',
      slug: '6',
      layer: 'Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual',
      attribution: "We acknowledge the use of imagery provided by services from NASA's Global Imagery Browse Services (GIBS), part of NASA's Earth Observing System Data and Information System (EOSDIS).",
      projection: 'EPSG:4326'
    },
    // {
    //   type: 'xyz',
    //   url: 'http://mt0.google.com/vt/lyrs=s&hl=he&x={x}&y={y}&z={z}',
    //   title_HE: `גוגל - לווין`,
    //   title_EN: 'Google - Satellite',
    //   slug: 'goolge_satellite',
    //   projection: 'EPSG:3857',
    // },
  ]
}