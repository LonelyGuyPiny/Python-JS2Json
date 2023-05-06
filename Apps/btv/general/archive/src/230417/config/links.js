export default [
  {
    layerName: `קומפילציית מגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://btv.bartech-net.co.il/show-form-results?planid=${this.plan}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=btv&codetaba=${this.plan}&lotid=${this.lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_num}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: "https://btv.bartech-net.co.il/show-form-results?planid=${this.plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=btv&codetaba=${this.plan_num}&lotid=${this.lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `תיקי בניין`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.bar_Entity_Number}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "https://srk.bartech-net.co.il/show-form-results?=ByDetails&TitleID=${this.E}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `שטחי ישוב`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `שמות ישובים באר טוביה`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `מרכזי ישוב`,
    url: "https://he.wikipedia.org/wiki/${this.CITYNAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://btv.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קוים כחולים - תוכניות`,
    url: "https://btv.bartech-net.co.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קוים כחולים - תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
];