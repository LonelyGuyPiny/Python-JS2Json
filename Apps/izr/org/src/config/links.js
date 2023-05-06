export default [
  {
    layerName: `חלקות`,
    url: "https://www.yizraelim.org.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קומפילציה`,
    url: "http://www.yizraelim.org.il/show-form-results?planid=${this.Taba_Name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציה`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  // {
  //   layerName: `קומפילציה`,
  //   url: "https://www.yizraelim.org.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.Taba_Name}",
  //   text: 'אתר הנדסי - תוכנית',
  //   type: 'URL'
  // },
  {
    layerName: `שמות ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `שטח מוא"ז מגידו`,
    url: "https://he.wikipedia.org/wiki/%D7%9E%D7%95%D7%A2%D7%A6%D7%94_%D7%90%D7%96%D7%95%D7%A8%D7%99%D7%AA_%D7%9E%D7%92%D7%99%D7%93%D7%95",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים קומפילציה`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים קומפילציה`,
    url: "http://www.yizraelim.org.il/show-form-results?planid=${this.Taba_Name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  
];