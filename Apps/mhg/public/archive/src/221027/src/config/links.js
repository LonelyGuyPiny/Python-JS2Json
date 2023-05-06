export default [
  {
    layerName: `חלקות`,
    url: "https://mrg.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://mrg.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.taba_t_plan_num}",
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
    layerName: `יעודי קרקע - קומפילציה`,
    url: "https://mrg.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - היסטורי`,
    url: "https://mrg.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];