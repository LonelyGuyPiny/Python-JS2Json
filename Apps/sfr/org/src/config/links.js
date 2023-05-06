export default [
  {
    layerName: `חלקות`,
    url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://sfr.bartech-net.co.il/show-form-results?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
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
  {
    layerName: `מדי מים`,
    url: "https://www.city-mind.com/Pages/Meter/MeterCards.aspx?mid=${this.MeterID}&index=1",
    text: 'מערכת ארד דליה',
    type: 'URL'
  },
  {
    layerName: `שמות צרכנים`,
    url: "https://www.city-mind.com/Pages/Meter/MeterCards.aspx?mid=${this.MeterID}&index=1",
    text: 'מערכת ארד דליה',
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.all_compilation_meshulav_lot_num},${this.taba_t_plan_num}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.all_compilation_meshulav_lot_num},${this.taba_t_plan_num}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.taba_t_plan_num}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: "https://sfr.bartech-net.co.il/show-form-results?&PlanID=${this.taba_t_plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.taba_t_plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: "https://mavat.iplan.gov.il/SV3?text=${this.taba_t_plan_num}",
    text: 'מינהל התכנון',
    type: 'URL'
  },
  {
    layerName: `קומפילציה שטוחה`,
    url: "https://www.tabanow.co.il/תבע/חיפוש?number=${this.taba_t_plan_num}",
    text: 'תב"ע עכשיו',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_name}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan_name}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_name}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: "https://sfr.bartech-net.co.il/show-form-results?&PlanID=${this.plan_name}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: "https://mavat.iplan.gov.il/SV3?text=${this.plan_name}",
    text: 'מינהל התכנון',
    type: 'URL'
  },
  {
    layerName: `יעודי קרקע היסטורים`,
    url: "https://www.tabanow.co.il/תבע/חיפוש?number=${this.plan_name}",
    text: 'תב"ע עכשיו',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.taba_t_plan_num}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
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
    layerName: `קווים כחולים`,
    url: "https://mavat.iplan.gov.il/SV3?text=${this.taba_t_plan_num}",
    text: 'מינהל התכנון',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://www.tabanow.co.il/תבע/חיפוש?number=${this.taba_t_plan_num}",
    text: 'תב"ע עכשיו',
    type: 'URL'
  },
];