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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_vector_public/sfr_public_general/MapServer/2`,
        field: 'HEB_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Farm Number",
        HE_name: "מספר משק",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_vector_public/sfr_public_general/MapServer/3',
        field: 'Meshek_No',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'SETL_NAME',
          required: true
        }]
      },
      {
        cb_id: 3,
        EN_name: "or: House Number",
        HE_name: "או: מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_vector_public/sfr_public_general/MapServer/3',
        field: 'HOUSE_NUM_1',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'SETL_NAME',
          required: true
        }]
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_vector_public/sfr_general_public_cadaster/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel Number",
        HE_name: "מספר חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_vector_public/sfr_general_public_cadaster/MapServer/2',
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
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/sfr_general_vector/sfr_yk_public_site/MapServer/1`,
      field: 'taba_t.plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/sfr_general_vector/sfr_yk_public_site/MapServer/3',
      field: 'all_compilation_meshulav.land_desgnation_plan',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'taba_t.plan_num',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/sfr_general_vector/sfr_yk_public_site/MapServer/3',
      field: 'all_compilation_meshulav.lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'taba_t.plan_num',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'all_compilation_meshulav.land_desgnation_plan',
        required: false
      }]
    }]
  },
];
