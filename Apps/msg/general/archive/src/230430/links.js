export default [
  // { 
  //   layerName: `כתובות`,
  //   url: 'msg2net://NB -prgname=GisLink_A -arguments=1,0,0,${this.HOUSE_NUM},,${this.STR_NAME},,,${this.SETL_NAME}',
  //   text: "בר",
  //   type: 'URL'
  // },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: "https://vaada-misgav.org.il/show-form-results?&PlanID=${this.plan}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_num}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan_num}',
    text: "בר - דף מידע",
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
    url: "https://www.vaada-misgav.org.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `מגרשים היסטוריים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    groupUrl: 'https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_plans/MapServer',
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lot_num},${this.plan_num}',
    text: "בר",
    type: 'URL'
  },
  {
    groupUrl: 'https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_plans/MapServer',
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan_num}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    groupUrl: 'https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_plans/MapServer',
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    groupUrl: 'https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_plans/MapServer',
    url: "https://www.vaada-misgav.org.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    groupUrl: 'https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_plans/MapServer',
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קומפילציית תשריטי חלוקה`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.lotNum},${this.plan_num}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קומפילציית תשריטי חלוקה`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lotNum},${this.plan_num}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `קומפילציית תשריטי חלוקה`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציית תשריטי חלוקה`,
    url: "https://www.vaada-misgav.org.il/show-form-results?planid=${this.plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציית תשריטי חלוקה`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "https://www.vaada-misgav.org.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תוכניות`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תוכניות`,
    url: "https://www.vaada-misgav.org.il/show-form-results?planid=${this.plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan_num}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תשריטי חלוקה`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תשריטי חלוקה`,
    url: "https://www.vaada-misgav.org.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תשריטי הפקעה`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תשריטי הפקעה`,
    url: "https://www.vaada-misgav.org.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תשריטי בינוי`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תשריטי בינוי`,
    url: "https://www.vaada-misgav.org.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.Entity_Number}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `תיקי בניין`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.Org_Entity_Number}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `תיקי בניין - תווית`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.Org_Entity_Number}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `גן ילדים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `גן ילדים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `גן ילדים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `גן ילדים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `גן משחקים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `גן משחקים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `גן משחקים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `גן משחקים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מועדון חברים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מועדון חברים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מועדון חברים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מועדון חברים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מועדון נוער`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מועדון נוער`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מועדון נוער`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מועדון נוער`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מגרש ספורט`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מגרש ספורט`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מגרש ספורט`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מגרש ספורט`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `בית כנסת`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `בית כנסת`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `בית כנסת`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `בית כנסת`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מקווה`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מקווה`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מקווה`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מקווה`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מסגד`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מסגד`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מסגד`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מסגד`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `בריכת שחיה`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `בריכת שחיה`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `בריכת שחיה`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `בריכת שחיה`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מכולת`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מכולת`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מכולת`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מכולת`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `משרדים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `משרדים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `משרדים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `משרדים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `בית ספר`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `בית ספר`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `בית ספר`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `בית ספר`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `מקלטים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מקלטים`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `מקלטים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `מקלטים`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `פעוטון`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `פעוטון`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `פעוטון`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `פעוטון`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `אחר`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `אחר`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `אחר`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `אחר`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `נכסים ללא סיווג`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.tik_binyan}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `נכסים ללא סיווג`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=51,${this.bakasha_num}",
    text: "מספר בקשה להיתר  - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `נכסים ללא סיווג`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?TitleID=${this.tik_binyan}",
    text: 'אתר הנדסי – תיק בניין',
    type: 'URL'
  },
  {
    layerName: `נכסים ללא סיווג`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.bakasha_num}&ApplicationDescription=&ApplicationPurpose=&g-recaptcha-response=",
    text: 'אתר הנדסי – מספר בקשה',
    type: 'URL'
  },
  {
    layerName: `בקשות`,
    url: "Msg2Net://NB -prgname=GisLink_P -arguments=${this.entity_type},${this.Entity_Number}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `בקשות`,
    url: "https://www.vaada-misgav.org.il/show-form-results-request?ApplicationNumber=${this.Entity_Number}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `פיקוח על בניה`,
    url: "Msg2Net://NB -prgname=GisLink_P  -arguments=10,${this.Building_Number}",
    text: "תיק בנין - בר שולחני",
    type: 'URL'
  },
  {
    layerName: `נכסים`,
    url: "Msg2Net://NB -prgname=GisLink_N -arguments=1,${this.Estate_Number}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `יישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `מס' מזהה פנייה`,
    url: "https://moked-misgav.binaa.co.il/ims/system/?view=custom&module=moked-page&id=${this.mainId}",
    text: 'מערכת מוקד',
    type: 'URL'
  },
  {
    layerName: `שם הסטטוס`,
    url: "https://moked-misgav.binaa.co.il/ims/system/?view=custom&module=moked-page&id=${this.mainId}",
    text: 'מערכת מוקד',
    type: 'URL'
  },
  {
    layerName: `כתובת אירוע`,
    url: "https://moked-misgav.binaa.co.il/ims/system/?view=custom&module=moked-page&id=${this.mainId}",
    text: 'מערכת מוקד',
    type: 'URL'
  },
  {
    layerName: `קריאות פתוחות`,
    url: "https://moked-misgav.binaa.co.il/ims/system/?view=custom&module=moked-page&id=${this.mainId}",
    text: 'מערכת מוקד',
    type: 'URL'
  },
  {
    layerName: `קריאות סגורות`,
    url: "https://moked-misgav.binaa.co.il/ims/system/?view=custom&module=moked-page&id=${this.mainId}",
    text: 'מערכת מוקד',
    type: 'URL'
  },
];