export default [
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובת"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "יישוב",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/mhg_general_vector/mhg_general/MapServer/2`,
        field: 'SETL_NAME'
      },
    ]
  },
  {
    id: 2,
    title: {
      EN: "Cadastre",
      HE: "רישום מקרקעין - גוש חלקה"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Block Number",
        HE_name: "מספר גוש",
        source: `https://stage1.intertown.co.il/arcgis/rest/services/mhg_general_vector/mhg_yk_0611/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel Number",
        HE_name: "מספר חלקה",
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/mhg_general_vector/mhg_yk_0611/MapServer/2',
        field: 'PARCEL',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'GUSH_NUM',
          required: true
        }]
      }]
  },
  {
  id: 3,
  title: {
    EN: "Planning Information",
    HE: "מידע תכנוני"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Plan",
      HE_name: "תוכנית",
      source: `https://stage1.intertown.co.il/arcgis/rest/services/mhg_general_vector/mhg_yk_0611/MapServer/24`,
      field: 'taba_t.plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mhg_general_vector/mhg_yk_0611/MapServer/29',
      field: 'land_desgnation_plan',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_num',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mhg_general_vector/mhg_yk_0611/MapServer/29',
      field: 'lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_num',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'land_desgnation_plan',
        required: false
      }]
    }]
  },
];
