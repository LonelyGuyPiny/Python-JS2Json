export default [
  {
    layerName: `חלקות יוני 2020`,
    url: "https://srk.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
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
  {
    layerName: `ועדים עם מילוי`,
    url: "https://he.wikipedia.org/wiki/${this.VAAD_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "https://srk.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByDetails&TitleID=${this.Org_Entity_Number}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `בקשות`,
    url: "https://srk.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByDetails&ApplicationNumber=${this.Entity_Number}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  // {
  //   layerName: ``,
  //   url: "",
  //   text: '',
  //   type: 'URL'
  // },
];