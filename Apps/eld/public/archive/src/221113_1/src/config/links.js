export default [
  {
    layerName: `כתובות`,
    url: "https://elad.bartech-net.co.il/SearchPermitApplicationResults/?searchType=ByAddress&AddressPlace=1309&AddressStreet=${this.STR_NAME}&AddressStreetNumber=${this.num}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://elad.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://elad.bartech-net.co.il/CityPlanSearchResult/?searchType=ByName&PlanName=${this.plans_name}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://stage1.intertown.co.il/share/bar/Getinfopage.php?itownsys=eld&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://elad.bartech-net.co.il/CityPlanSearchResult/?searchType=ByName&PlanName=${this.plans_name}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://stage1.intertown.co.il/share/bar/Getinfopage.php?itownsys=eld&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `תוכניות`,
    url: "https://elad.bartech-net.co.il/CityPlanSearchResult/?searchType=ByName&PlanName=${this.name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
    text: 'רמ"י',
    type: 'URL'
  },
];