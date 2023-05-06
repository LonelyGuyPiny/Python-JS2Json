export default [
  
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובות"
    },
  comboboxes: [{
    cb_id: 1,
    EN_name: "Settlement Name",
    HE_name: "שם ישוב",
    source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_BNTL/MapServer/2`,
    field: 'SETL_NAME'
  },
  {
    cb_id: 4,
    EN_name: "Street name",
    HE_name: "שם רחוב",
    source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_BNTL/MapServer/2',
    field: 'STR_NAME',
    filters: [{
      id: 1,
      cb_id: 1,
      field: 'SETL_NAME',
      required: true
    }]
  },
    {
      cb_id: 3,
      EN_name: "house number",
      HE_name: "מספר בית",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/gln_general_vector/gln_yk/MapServer/21',
      field: 'HOUSE_NUM',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'SETL_NAME',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'STR_NAME',
        required: false
      }]
    }
  ]
},
{
  id: 3,
  title: {
    EN: "Cadastre",
    HE: "רישום מקרקעין - גוש חלקה"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Block",
      HE_name: "גוש",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_cadaster/MapServer/2`,
      field: 'GUSH_NUM'
    },
    {
      cb_id: 2,
      EN_name: "Parcel",
      HE_name: "חלקה",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_cadaster/MapServer/2',
      field: 'PARCEL',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'GUSH_NUM',
        required: true
      }]
    }]
},
];
