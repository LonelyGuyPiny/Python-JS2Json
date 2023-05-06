export default [
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובות"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "ישוב",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/8`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/8',
        field: 'STR_FULNAM',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'SETL_NAME',
          required: true
        }]
      },
      {
        cb_id: 3,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/8',
        field: 'HOUSE_NUM',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'SETL_NAME',
          required: true
        }, {
          id: 2,
          cb_id: 2,
          field: 'STR_FULNAM',
          required: true
        }]
      }
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
        EN_name: "Block",
        HE_name: "גוש",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_cadaster_sde/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_cadaster_sde/MapServer/2',
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
      HE_name: "תכנית",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/1`,
      field: 'name'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/3',
      field: 'lots_land_use_original',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plans_name',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/3',
      field: 'lots_lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plans_name',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'lots_land_use_original',
        required: false
      }]
    }
  ]
},
];
