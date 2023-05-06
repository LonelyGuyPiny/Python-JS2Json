export default [
  {
    layerName: `חלקות`,
    url: "https://mrg.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://mrg.bartech-net.co.il/show-form-results?planid=${this.blue_lines_plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.blue_lines_plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: "https://mrg.bartech-net.co.il/show-form-results?planid=${this.plan_num}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=mhg&codetaba=${this.plan_num}&lotid=${this.lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  // {
  //   layerName: `יעודי קרקע - היסטורי`,
  //   url: "https://mrg.bartech-net.co.il/show-form-results?planid=${this.plan_num}",
  //   text: 'אתר הנדסי - תוכניות',
  //   type: 'URL'
  // },
  {
    layerName: `יעודי קרקע - היסטורי`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=mhg&codetaba=${this.plan_num}&lotid=${this.lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];