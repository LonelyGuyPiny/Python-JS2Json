export default [
  // {
  //   layerName: `יעודי קרקע - קומפילציה`,
  //   url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.compilation_lot_num},${this.taba_t_plan_num}',
  //   text: "ניהול ועדה",
  //   type: 'URL'
  // },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: 'https://srk.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.taba_t_plan_num}',
    text: "אתר הנדסי",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: 'https://srk.bartech-net.co.il/SearchLandDesignationResults/?SearchType=L&MigrashID=${this.lot_num}&CityPlan=${this.plan_num}',
    text: "מידע תכנוני",
    type: 'URL'
  },
  // {
  //   layerName: `יעודי קרקע - קומפילציה`,
  //   url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.compilation_lot_num},${this.taba_t_plan_num}',
  //   text: "מידע תכנוני",
  //   type: 'URL'
  // },
  {
    layerName: `יעודי קרקע - היסטורי`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.compilation_lot_num},${this.taba_t_plan_num}',
    text: "ניהול ועדה",
    type: 'URL'
  },
  // {
  //   layerName: `יעודי קרקע - היסטורי`,
  //   url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.taba_t_plan_num}',
  //   text: "ניהול ועדה - תוכנית",
  //   type: 'URL'
  // },
  // {
  //   layerName: `יעודי קרקע - היסטורי`,
  //   url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.compilation_lot_num},${this.taba_t_plan_num}',
  //   text: "ניהול ועדה - דף מידע",
  //   type: 'URL'
  // },
  // {
  //   layerName: `חלקות מרץ 2021`,
  //   url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
  //   text: "ניהול ועדה",
  //   type: 'URL'
  // },
  {
    layerName: `חלקות מרץ 2021`,
    url: "https://srk.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },  
  // {
  //   layerName: `קווים כחולים`,
  //   url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.taba_t_plan_num}",
  //   text: "ניהול ועדה",
  //   type: 'URL'
  // },
  {
    layerName: `קווים כחולים`,
    url: "https://srk.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.taba_t_plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.taba_t_plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `ועדים`,
    url: "https://he.wikipedia.org/wiki/${this.VAAD_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];