export default [
  {
    layerName: `חלקות`,
    url: "https://azr.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://www.nadlan.gov.il/?search=גוש ${this.GUSH_NUM} חלקה ${this.PARCEL}",
    text: 'עסקאות נדל"ן',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: "https://azr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://azr.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.taba_t_plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `כתובות`,
    url: "https://www.nadlan.gov.il/?search=${this.street_name} ${this.street_num}, אזור",
    text: 'עסקאות נדל"ן',
    type: 'URL'
  },
];