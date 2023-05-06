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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_general_layers/MapServer/13`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Farm Number",
        HE_name: "מספר משק",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_general_layers/MapServer/6',
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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_general_layers/MapServer/6',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_cadaster_layers/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel Number",
        HE_name: "מספר חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_cadaster_layers/MapServer/2',
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_yk_vector/sfr_yk_layers/MapServer/4`,
      field: 'taba_t.plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_yk_vector/sfr_yk_layers/MapServer/3',
      field: 'land_desgnation_plan',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_name',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_yk_vector/sfr_yk_layers/MapServer/3',
      field: 'lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_name',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'land_desgnation_plan',
        required: false
      }]
    }]
  },
  {
    id: 4,
    title: {
      EN: "Property Taxes",
      HE: "ארנונה"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Asset Number",
        HE_name: "מספר נכס",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_arnona_layers_sde/MapServer/3`,
        field: 'physi'
      },
      {
        cb_id: 2,
        EN_name: "or: Payer Name",
        HE_name: "או: שם משלם",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_arnona_layers_sde/MapServer/3',
        field: 'משלם'
      },
      {
        cb_id: 3,
        EN_name: "or: Owner Name",
        HE_name: "או: שם בעלים",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/sfr_general_vector/sfr_arnona_layers_sde/MapServer/3',
        field: 'בעל_הנכס'
      },
    ]
  },
  {
    id: 5,
    title: {
      EN: "Water Meters",
      HE: "מדי מים"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Meter Number",
        HE_name: "מספר מד מים",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/sfr_general_vector/sfr_aradDalya_interface/MapServer/2`,
        field: 'MeterID'
      },
      {
        cb_id: 2,
        EN_name: "or: Customer Name",
        HE_name: "או: שם צרכן",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/sfr_general_vector/sfr_aradDalya_interface/MapServer/2',
        field: 'ConsumerName'
      },
    ]
  },
];
