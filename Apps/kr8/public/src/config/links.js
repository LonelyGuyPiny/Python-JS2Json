export default [
  {
    layerName: `כתובות`,
    url: "https://k-shmona.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByAddress&AddressPlace=2800&AddressStreet=${this.STR_FULNAM}&AddressStreetNumber=${this.HOUSE_NUM}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `כתובות`,
    url: "https://www.nadlan.gov.il/?search=${this.STR_FULNAM}${this.HOUSE_NUM},קרית-שמונה",
    text: 'Gov נדלן',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://k-shmona.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://www.nadlan.gov.il/?search=${this.GUSH_NUM}%20%D7%97%D7%9C%D7%A7%D7%94%20${this.PARCEL}",
    text: 'Gov נדלן',
    type: 'URL'
  },
  {
    layerName: `גבול תוכנית`,
    url: "https://k-shmona.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `גבול תוכנית`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
    text: 'רמ"י',
    type: 'URL'
  },
];