export default [
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: "https://e-galil.bartech-net.co.il/show-form-results?PlanID=${this.Taba_Name}",
    text: 'אתר הוועדה',
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: 'https://e-galil.bartech-net.co.il/SearchLandDesignationResults/?SearchType=L&MigrashID=${this.Lot_No}&CityPlan=${this.Taba_Name}',
    text: "מידע תכנוני",
    type: 'URL'
  }, 
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.Taba_Name}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.Lot_No},${this.Taba_Name}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `קומפילציית ייעודי קרקע`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים`,
    url: "https://e-galil.bartech-net.co.il/show-form-results?PlanID=${this.Taba_Name}",
    text: 'אתר הוועדה',
    type: 'URL'
  },
  
  {
    layerName: `קווים כחולים`,
    url: "Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.Taba_Name}",
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `מגרשים הסטורי- קו מתאר`,
    url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.Lot_No},${this.Taba_Name}',
    text: "בר",
    type: 'URL'
  },
  {
    layerName: `מגרשים הסטורי- קו מתאר`,
    url: 'Msg2Net://NB -prgname=GisLink_L -arguments=1,${this.lot_num},${this.plan_num}',
    text: "בר - דף מידע",
    type: 'URL'
  },
  {
    layerName: `מגרשים הסטורי- קו מתאר`,
    url: 'Msg2Net://NB -prgname=GisLink_T -arguments=1,0,${this.plan_num}',
    text: "בר - תוכנית",
    type: 'URL'
  },
  {
    layerName: `מגרשים הסטורי- קו מתאר`,
    url: "https://www.vaada-misgav.org.il/show-form-results?&PlanID=${this.plan_num}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `מגרשים הסטורי- קו מתאר`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.all_lots_Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `חלקות`,
    url: "Msg2Net://NB -prgname=GisLink_G -arguments=1,${this.GUSH_NUM},${this.PARCEL}",
    text: "בר",
    type: 'URL'
  },
];