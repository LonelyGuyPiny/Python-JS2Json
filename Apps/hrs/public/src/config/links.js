export default [
  // { 
  //   layerName: `כתובות`,
  //   url: 'msg2net://NB -prgname=GisLink_A -arguments=1,0,0,${this.HOUSE_NUM},,${this.STR_NAME},,,${this.SETL_NAME}',
  //   text: "בר",
  //   type: 'URL'
  // },
  {
    layerName: `חלקות`,
    url: "https://www.harishpl.org/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://www.nadlan.gov.il/?search=גוש ${this.GUSH_NUM} חלקה ${this.PARCEL}",
    text: 'נדלן Gov',
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
    url: "https://www.harishpl.org/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.name}",
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