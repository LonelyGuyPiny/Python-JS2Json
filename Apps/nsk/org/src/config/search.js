export default [
  {
    id: 1,
    title: {
      EN: "Nahal Sorek  ",
      HE: "ישובי שורקות"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "יישוב",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_general_public/MapServer/0',
        field: 'SETL_NAME',
        },
      ]
    },
  {
    id: 2,
    title: {
      EN: "Addresses",
      HE: "כתובות - ישובי שורקות"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "יישוב",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_general/MapServer/6`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_general/MapServer/6',
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
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_general/MapServer/6',
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
          required: true
        }]
      }
    ]
  },
  {
    id: 3,
    title: {
      EN: "Cadastre",
      HE: "גוש וחלקה - שורקות"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Block Number",
        HE_name: "מספר גוש",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_cadastre/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel Number",
        HE_name: "מספר חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_cadastre/MapServer/2',
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
  id: 4,
  title: {
    EN: "Planning Information",
    HE: "מידע תכנוני - שורקות"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Plan",
      HE_name: "תוכנית",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_yk_compilation/MapServer/1`,
      field: 'plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_yk_compilation/MapServer/1',
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
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/srk_general_vector/srk_yk_compilation/MapServer/1',
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
  {
    id: 5,
    title: {
      EN: "Taxes Collection",
      HE: "גבייה - ממשק עם EPR"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Customer Name",
        HE_name: "שם משלם",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_epr_sync/MapServer/1`,
        field: 'PayerName',
      },
      {
        cb_id: 2,
        EN_name: "or: Asset Number",
        HE_name: "או: מספר נכס",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_epr_sync/MapServer/1`,
        field: 'asset_num',
      },
    ]
  },
];
