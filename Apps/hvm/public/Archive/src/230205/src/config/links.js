export default [
  // {
  //   layerName: `קומפילציית מגרשים`,
  //   url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lots_lot_num},${this.plans_name}',
  //   text: "בר",
  //   type: 'URL'
  // },
  {
    layerName: `קומפילציית מגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plans_name}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://hmd.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plans_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  // {
  //   layerName: `קומפילציית מגרשים`,
  //   url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=hvm&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
  //   text: 'דף מידע',
  //   type: 'URL'
  // },
  // {
  //   layerName: `כל המגרשים`,
  //   url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lots_lot_num},${this.plans_name}',
  //   text: "בר",
  //   type: 'URL'
  // },
  // {
  //   layerName: `כל המגרשים`,
  //   url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plans_name}',
  //   text: "בר - תוכנית",
  //   type: 'URL'
  // },
  // {
  //   layerName: `כל המגרשים`,
  //   url: "https://gzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plans_name}",
  //   text: 'אתר הנדסי - תוכנית',
  //   type: 'URL'
  // },
  // {
  //   layerName: `כל המגרשים`,
  //   url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=hvm&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
  //   text: 'דף מידע',
  //   type: 'REQUEST'
  // },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=hvm&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  // {
  //   layerName: `סלי זכויות`,
  //   url: "https://gzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.ITown_SDE_GZR_INFOPAGE_ITown_yk_Plans_name}",
  //   text: 'אתר הנדסי - תוכנית',
  //   type: 'URL'
  // },
  // {
  //   layerName: `חלקות `,
  //   url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
  //   text: "בר",
  //   type: 'URL'
  // },
  {
    layerName: `חלקות `,
    url: "https://hvm.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תכניות`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.name}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `תכניות`,
    url: "https://gzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
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
    layerName: `תיקי בניין`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.bar_Entity_Number}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "https://gzr.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByDetails&TitleID=${this.bar_Org_Entity_Number}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `בקשות להיתר`,
    url: "Msg2Net://NB -prgname=GisLink_P -arguments=${this.bar_Entity_Number},${this.bar_entity_type}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `בקשות להיתר`,
    url: "https://gzr.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByDetails&ApplicationNumber=${this.bar_Entity_Number}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `פיקוח על הבנייה`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.bar_Building_Number}",
    text: "בר - תיק בניין",
    type: 'URL'
  },
];