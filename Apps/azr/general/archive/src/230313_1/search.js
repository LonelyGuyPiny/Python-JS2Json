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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer/1',
        field: 'street_name',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer/2',
        field: 'street_num',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_cadaster_sde/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_cadaster_sde/MapServer/2',
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer/145`,
      field: 'taba_t.plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer/33',
      field: 'land_desgnation_plan',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_num',
        required: true
      }]
    },
    {
      cb_id: 1,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_handasa/MapServer/33',
      field: 'lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_num',
        required: false
      }, {
        id: 2,
        cb_id: 2,
        field: 'land_desgnation_plan',
        required: false
      }]
    }
  ]
},
{
  id: 4,
  title: {
    EN: "Arnona",
    HE: "ארנונה עסקים ומסחר"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Asset Number",
      HE_name: "מס נכס",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_arnona/MapServer/1',
      field: 'NECES',
      },
      {
      cb_id: 2,
      EN_name: "or: Asset owner",
      HE_name: "או: בעל הנכס",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/azr_general_vector/azr_arnona/MapServer/1',
      field: 'FAMILYNAME',
      },
    ]
},
];
