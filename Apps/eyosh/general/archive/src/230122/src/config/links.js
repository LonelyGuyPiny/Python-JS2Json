export default [
  {
    layerName: `קומפילציית מגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Lots_lot_num},${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://yov.bartech-net.co.il/show-form-results?planid=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=yov&codetaba=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}&lotid=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `כל המגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Lots_lot_num},${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `כל המגרשים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://yov.bartech-net.co.il/show-form-results?planid=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `כל המגרשים`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=yov&codetaba=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Plans_name}&lotid=${this.ITown_SDE_YOV_ITOWN_INFOPAGE_ITown_yk_Lots_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
  {
    layerName: `חלקות`,
    url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://yov.bartech-net.co.il/show-form-results?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.name}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
    url: "https://yov.bartech-net.co.il/show-form-results?&PlanID=${this.name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];