export default [
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://stage1.intertown.co.il/share/bar/Getinfopage.php?itownsys=yov&codetaba=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}&lotid=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://stage1.intertown.co.il/share/bar/Getinfopage.php?itownsys=yov&codetaba=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}&lotid=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `חלקות`,
    url: "https://yov.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
    url: "https://yov.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
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
];