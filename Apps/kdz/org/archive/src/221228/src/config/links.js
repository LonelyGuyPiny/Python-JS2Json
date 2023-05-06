export default [
  {
    layerName: `חלקות`,
    url: "http://handasi.complot.co.il/handasi2016/redirects/unf.htm?sid=49&g=${this.GUSH_NUM}&h=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://www.nadlan.gov.il/?search=גוש ${this.GUSH_NUM} חלקה ${this.HELKA}",
    text: 'Gov נדל"ן',
    type: 'URL'
  },
  {
    layerName: `גבול תכנית`,
    url: "https://www.sharonim.org.il/newengine/Pages/taba2.aspx#search/GetTabaByNumber&siteid=29&n=${this.PLAN_NAME}&l=true&arguments=siteid,n,l",
    text: 'אתר הנדסי - תוכניות',
    type: 'URL'
  },
  {
    layerName: `ממשק לועדה`,
    url: "http://handasi.complot.co.il/handasi2016/redirects/unf.htm?sid=49&g=${this.GUSH_NUM}&h=${this.HELKA}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `כתובות`,
    url: "https://www.nadlan.gov.il/?search=${this.STR_NAME} ${this.HOUSE_NUM} קדימה-צורן",
    text: 'Gov נדל"ן',
    type: 'URL'
  },
];