export default [
  {
    layerName: `תיקי בניין`,
    url: "https://elad.bartech-net.co.il/show-form-results&AddressStreet=${this.STR_NAME}&AddressStreetNumber=${this.num}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://elad.bartech-net.co.il/show-form-results?&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://elad.bartech-net.co.il/show-form-results?&Planid=${this.plans_name}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=eld&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://elad.bartech-net.co.il/show-form-results?&PlanName=${this.plans_name}",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=eld&codetaba=${this.plans_name}&lotid=${this.lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `תוכניות`,
    url: "https://elad.bartech-net.co.il/show-form-results?&PlanName=${this.name}",
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