export default [
  {
    layerName: `כתובות`,
    url: "https://www.nadlan.gov.il/?search= ${this.STR_FULNAM} ${this.HOUSE_NUM}, קרית שמונה",
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
    text: 'עסקאות נדל"ן',
    type: 'URL'
  },
  {
    layerName: `גבול תוכניות`,
    url: "https://k-shmona.bartech-net.co.il/show-form-results?planid=${this.name}",
    text: 'אתר הוועדה',
    type: 'URL'
  },
  {
    layerName: `גבול תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: "https://k-shmona.bartech-net.co.il/show-form-results?planid=${this.ITown_SDE_KR8_INFOPAGE_ITown_yk_Plans_1_name}",
    text: 'אתר הוועדה',
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=kr8&codetaba=${this.ITown_SDE_KR8_INFOPAGE_ITown_yk_Plans_1_name}&lotid=${this.ITown_SDE_KR8_INFOPAGE_ITown_yk_Lots_1_lot_num}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
];