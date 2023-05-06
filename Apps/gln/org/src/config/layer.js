export default [
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_general/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type:"arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_yk/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/Turism/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
     type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/KLITA/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/ASSAKIM/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/%D7%99%D7%97%D7%99%D7%93%D7%94_%D7%A1%D7%91%D7%99%D7%91%D7%AA%D7%99%D7%AA/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/TIFUL/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/AGRICULTURE/MapServer',
    // export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/SECURITY/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
    virtualGroup:'בטחון',
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/%D7%92%D7%95%D7%A9%D7%99%D7%9D_%D7%95%D7%97%D7%9C%D7%A7%D7%95%D7%AA/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/REKA/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/moreshet/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/HANDASSA_TASHTIOT/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/%D7%95%D7%A2%D7%93%D7%94_%D7%9C%D7%AA%D7%9B%D7%A0%D7%95%D7%9F_%D7%91%D7%A7%D7%A9%D7%94_%D7%9E%D7%99%D7%93%D7%A2/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_bar_sde/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_aplication_InitiatedPlanning1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_tasrit_haluka/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_yeshuvim/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%95%D7%AA_%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    url: 'https://gis.megolan.org.il/arcgis/rest/services/Intertown/TAMA_TAMAM/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
  type: "arcgis",
  },
  {
    virtualGroup: 'Xplan - מנהל התכנון',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan_2039/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "argis",
  },
]