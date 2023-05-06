export default [
  // {
  //   layerName: `קומפילציה`,
  //   url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan}',
  //   text: "בר",
  //   type: 'URL'
  // },
  // {
  //   layerName: `קומפילציה`,
  //   url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan}',
  //   text: "בר - דף מידע",
  //   type: 'URL'
  // },
  // {
  //   layerName: `קומפילציה`,
  //   url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan}',
  //   text: "בר - תוכנית",
  //   type: 'URL'
  // },
  // {
  //   layerName: `קומפילציה`,
  //   url: "https://nzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan}",
  //   text: 'אתר הנדסי - תוכנית',
  //   type: 'URL'
  // },
  {
    layerName: `קומפילציה`,
    url: "https://mavat.iplan.gov.il/SV3?text=${this.plan}",
    text: 'תכנון זמין',
    type: 'URL'
  },
  {
    layerName: `קומפילציה`,
    url: "https://www.tabanow.co.il/תבע/חיפוש?number=${this.plan}",
    text: 'תב"ע עכשיו',
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_num}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan_num}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: "https://mavat.iplan.gov.il/SV3?text=${this.plan_num}",
    text: 'תכנון זמין',
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: "https://www.tabanow.co.il/תבע/חיפוש?number=${this.plan_num}",
    text: 'תב"ע עכשיו',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
    text: "בר",
    type: 'URL'
  },
  // {
  //   layerName: `חלקות`,
  //   url: "https://nzr.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
  //   text: 'אתר הנדסי',
  //   type: 'URL'
  // },
  {
    layerName: `קוים כחולים`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}",
    text: "בר",
    type: 'URL'
  },
  // {
  //   layerName: `קוים כחולים`,
  //   url: "https://nzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan_num}",
  //   text: 'אתר הנדסי',
  //   type: 'URL'
  // },
  {
    layerName: `תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
];