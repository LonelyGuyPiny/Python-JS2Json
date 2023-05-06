export default [
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובות"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_general_basis/MapServer/3',
        field: 'STR_NAME',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_general_basis/MapServer/1',
        field: 'BLDG_NUM',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'street_name',
            required: true
            },
          ]
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
        EN_name: "Block",
        HE_name: "גוש",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_engi_cadastre/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_engi_cadastre/MapServer/3',
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_muni_compilation/MapServer/1`,
      field: 'taba_t.plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_muni_compilation/MapServer/2',
      field: 'land_desgnation_plan',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'code_he',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/lhv_general_layers/lhv_muni_compilation/MapServer/2',
      field: 'lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'code_he',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'land_desgnation_plan',
        required: false
      }]
    }
  ]
},
];
