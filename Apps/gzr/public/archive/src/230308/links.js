export default [
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://gzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plans_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://gzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plans_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `סלי זכויות`,
    url: "https://gzr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.ITown_SDE_GZR_INFOPAGE_ITown_yk_Plans_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `חלקות נובמבר 2020`,
    url: "https://gzr.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
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
];