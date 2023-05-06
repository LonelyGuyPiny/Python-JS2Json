export default [
  {
    id: 1,
    title: {
      EN: "Settlement-Lot",
      HE: "ישוב-מגרש"
    },
    comboboxes: [ {
      cb_id: 1,
      EN_name: "Settlement",
      HE_name: "ישוב",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_yk_layers/MapServer/1`,
      field: 'SETL_NAME'
    },
      {
        cb_id: 2,
        EN_name: "Lot Number",
        HE_name: "מספר מגרש",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_yk_layers/MapServer/4',
        field: 'lot_num',
        filters: [{
          cb_id: 1,
          field: 'yeshuv_name',
          required: true
        }]
      }]
      },
  {
    id: 2,
    title: {
      EN: "Planning Information",
      HE: "מידע תכנוני"
      },
      comboboxes: [{
          cb_id: 1,
          EN_name: "Plan",
          HE_name: "תוכנית",
          source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_yk_layers/MapServer/4`,
          field: 'plan'
        },
        {
          cb_id: 4,
          EN_name: "Land Use",
          HE_name: "יעוד קרקע (אופציונלי)",
          source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_yk_layers/MapServer/4',
          field: 'land_desgnation_plan',
          filters: [{
            id: 1,
            cb_id: 1,
            field: 'plan',
            required: true
          }]
        },
        {
          cb_id: 3,
          EN_name: "Lot",
          HE_name: "מגרש",
          source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/smr_general_vector/smr_yk_layers/MapServer/4',
          field: 'lot_num',
          filters: [{
            id: 1,
            cb_id: 1,
            field: 'plan',
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
