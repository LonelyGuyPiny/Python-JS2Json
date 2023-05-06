// for not ref you can pass only empty array like this: export default []
export default [
  {
    proj: 'EPSG:2039' ,
    proj4js: '+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33009,-1.85269,1.66969,5.4248 +units=m +no_defs',
    dec_digits: 1,
    title_HE: 'רשת ישראל החדשה ITM',
    title_EN: 'Israeli TM Grid'
  },
  {
    proj: 'EPSG:28193' ,
    proj4js: '+proj=cass +lat_0=31.73409694444445 +lon_0=35.21208055555556 +x_0=170251.555 +y_0=1126867.909 +a=6378300.789 +b=6356566.435 +towgs84=-275.722,94.7824,340.894,-8.001,-4.42,-11.821,1 +units=m +no_defs',
    dec_digits: 1,
    title_HE: 'רשת ישראל הישנה ICS',
    title_EN: 'Israeli CS Grid'
  },
  {
    proj: 'EPSG:4326' ,
    proj4js: '+proj=longlat +datum=WGS84 +no_defs',
    dec_digits: 6,
    title_HE: 'מערכת גאודטית עולמית WGS 84',
    title_EN: 'WGS 84 World Geodetic System'
  },
  {
    proj: 'EPSG:3857' ,
    proj4js: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
    dec_digits: 1,
    title_HE: 'היטל מרקטור WGS 84',
    title_EN: 'WGS 84 Web Mercator'
  },
]