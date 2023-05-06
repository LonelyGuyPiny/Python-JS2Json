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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_general_layers/MapServer/6',
        field: 'שם_רחוב',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_general_layers/MapServer/2',
        field: 'ID',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'street',
            required: true
            },
          ]
        },
      ]
  },
  {
  id: 2,
  title: {
    EN: "Planning Information",
    HE: "מידע תכנוני"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Plan Code",
      HE_name: "קוד תוכנית",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_yk_layers/MapServer/2`,
      field: 'plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_yk_layers/MapServer/2',
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
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kr4_general_vector/kr4_yk_layers/MapServer/2',
      field: 'lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plan_num',
        required: true
      }, {
        id: 1,
        cb_id: 2,
        field: 'land_desgnation_plan',
        required: false
      }]
    }
  ]
},
];
