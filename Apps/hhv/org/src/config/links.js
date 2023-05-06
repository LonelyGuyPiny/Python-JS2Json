export default [
  {
    layerName: `קווים כחולים - תוכניות בתוקף`,
    url: "https://hhv.bartech-net.co.il/show-form-results?planid=${this.blue_lines_code_taba}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  {
    layerName: `קומפילציה`,
    url: "https://hhv.bartech-net.co.il/show-form-results?planid=${this.plan_num}",
    text: 'אתר הנדסי',
    type: 'URL'
  },
  // {
  //   layerName: `קווים כחולים - תוכניות בתוקף`,
  //   url: 'Msg2Net://NB -prgname=GisLink_G -arguments=1,0,0,0,0,,0,${this.MIGRASH_NU},${this.NAME}',
  //   text: "בר",
  //   type: 'URL'
  // },
  {
    layerName: `שמות ישובים`,
    url: "https://he.wikipedia.org/wiki/${this.SETL_NAME}",
    text: 'ויקיפדיה',
    type: 'URL'
  },
];