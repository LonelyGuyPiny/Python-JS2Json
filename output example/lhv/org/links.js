export default [
  {
    layerName: `קווים כחולים`,
    url: "https://lehavim.bartech-net.co.il/show-form-results?planid=${this.taba_t_plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: "https://lehavim.bartech-net.co.il/show-form-results?planid=${this.code_he}",
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
    layerName: `חלקות`,
    url: "https://lehavim.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
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
    layerName: `כתובות`,
    url: "https://lehavim.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByAddress&AddressPlace=1271&AddressStreet=${this.street_name}&AddressStreetNumber=${this.BLDG_NUM}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `כתובות`,
    url: "https://www.nadlan.gov.il/?search=${this.street_name} ${this.BLDG_NUM}, להבים",
    text: 'עסקאות נדל"ן',
    type: 'URL'
  },
];