export default [
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_num}',
    text: "ניהול ועדה",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: 'https://srk.bartech-net.co.il/show-form-results?planid=${this.plan_num}',
    text: "אתר הנדסי",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - קומפילציה`,
    url: 'https://srk.bartech-net.co.il/SearchLandDesignationResults/?SearchType=L&MigrashID=${this.lot_num}&CityPlan=${this.plan_num}',
    text: "מידע תכנוני",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - היסטורי`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_num}',
    text: "ניהול ועדה",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - היסטורי`,
    url: 'https://srk.bartech-net.co.il/show-form-results?planid=${this.plan_num}',
    text: "אתר הנדסי",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע - היסטורי`,
    url: 'https://srk.bartech-net.co.il/SearchLandDesignationResults/?SearchType=L&MigrashID=${this.lot_num}&CityPlan=${this.plan_num}',
    text: "מידע תכנוני",
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
    text: "ניהול ועדה",
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://srk.bartech-net.co.il/show-form-results?&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },  
  {
    layerName: `קווים כחולים`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.taba_t_plan_num}",
    text: "ניהול ועדה",
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://srk.bartech-net.co.il/show-form-results?planid=${this.taba_t_plan_num}",
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
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `ועדים`,
    url: "https://he.wikipedia.org/wiki/${this.VAAD_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.Entity_Number}",
    text: "ניהול ועדה",
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "https://srk.bartech-net.co.il/show-form-results-request?ApplicationNumber=${this.Org_Entity_Number}",
    text: 'אתר הנדסי - בקשות',
    type: 'URL'
  },
  {
    layerName: `בקשות`,
    url: "Msg2Net://NB -prgname=GisLink_P -arguments=${this.entity_type},${this.Entity_Number}",
    text: "ניהול ועדה",
    type: 'URL'
  },
  {
    layerName: `בקשות`,
    url: "https://srk.bartech-net.co.il/show-form-results-request?ApplicationNumber=${this.Org_Entity_Number}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
];