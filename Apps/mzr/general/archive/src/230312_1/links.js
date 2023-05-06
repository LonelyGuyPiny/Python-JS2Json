export default [
  // {
  //   layerName: `כתובות`,
  //   url: "https://www.nadlan.gov.il/?search= ${this.STR_FULNAM} ${this.HOUSE_NUM}, קרית שמונה",
  //   text: 'Gov נדלן',
  //   type: 'URL'
  // },
  {
    layerName: `חלקות`,
    url: "https://mizpe.bartech-net.co.il/show-form-results?planid=${this.PARCEL}",
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
    layerName: `אינדקס תוכניות`,
    url: "https://mizpe.bartech-net.co.il/show-form-results?planid=${this.name}",
    text: 'אתר הוועדה',
    type: 'URL'
  },
  {
    layerName: `אינדקס תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `יעוד קרקע`,
    url: "https://gis.intertown.co.il/share/bar/Getinfopage.php?itownsys=mzr&codetaba=${this.block}&lotid=${this.parcel}",
    text: 'דף מידע',
    type: 'REQUEST'
  },
];