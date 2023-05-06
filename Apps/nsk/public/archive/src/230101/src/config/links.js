export default [
  {
    layerName: `חלקות`,
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
    url: "http://www.mavat.moin.gov.il/MavatPS/Forms/SV3.aspx?tid=4&tnumb=${this.taba_t_plan_num}",
    text: 'תכנון זמין',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://mavat.iplan.gov.il/SV3?text=${this.taba_t_plan_num}",
    text: 'תכנון זמין (חדש)',
    type: 'URL'
  },
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];