export default [
  {
    layerName: `חלקות`,
    url: "https://sfr.bartech-net.co.il/show-form-results?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://sfr.bartech-net.co.il/show-form-results?&PlanID=${this.taba_t_plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע`,
    url: "https://sfr.bartech-net.co.il/show-form-results?&PlanID=${this.taba_t_plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.taba_t_plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `שמות יישובים`,
    url: "https://he.wikipedia.org/wiki/${this.HEB_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `גבול שיפוט`,
    url: "https://he.wikipedia.org/wiki/${this.VAAD_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];