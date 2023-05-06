export default [
  {
    layerName: `חלקות`,
    url: "https://ngm.bartech-net.co.il/BlockParcelSearchResults.aspx?1=1&gush=${this.GUSH_NUM}&helka=${this.PARCEL}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.שם}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://ngm.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציית מגרשים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קומפילציית תרש''צים`,
    url: "https://ngm.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.plan}",
    text: 'אתר הנדסי - תוכנית',
    type: 'URL'
  },
  {
    layerName: `קומפילציית תרש''צים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.plan}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - קומפילציה`,
    url: "https://ngm.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.Taba_Name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - קומפילציה`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תוכניות`,
    url: "https://ngm.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.Taba_Name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תוכניות`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תרש''צים`,
    url: "https://ngm.bartech-net.co.il/CityPlanSearchResult/?searchType=ByDetails&PlanID=${this.Taba_Name}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קווים כחולים - תרש''צים`,
    url: "https://gis.intertown.co.il/share/rami/getramiplan.php?plan=${this.Taba_Name}",
    text: 'רמ"י',
    type: 'URL'
  },
  {
    layerName: `בתי ספר`,
    url: "https://apps.education.gov.il/imsnet/PirteiMosad.aspx?Sm=${this.SemelMosad}",
    text: 'משרד החינוך',
    type: 'URL'
  },
  {
    layerName: `גנים`,
    url: "https://apps.education.gov.il/imsnet/PirteiMosad.aspx?Sm=${this.semelmosad_1}",
    text: 'משרד החינוך',
    type: 'URL'
  },
  {
    layerName: `גני ילדים`,
    url: "https://apps.education.gov.il/imsnet/PirteiMosad.aspx?Sm=${this.semel}",
    text: 'משרד החינוך',
    type: 'URL'
  },
];