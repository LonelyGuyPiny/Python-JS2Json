export default [
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.MEANING}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `קומפילציה - ייעודי קרקע`,
    url: "https://www.shomron.org.il/show-form-results?&PlanID=${this.plan}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `גבול תוכנית`,
    url: "https://www.shomron.org.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `גבול תוכנית`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
];