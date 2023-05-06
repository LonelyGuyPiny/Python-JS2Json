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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_bntl/MapServer/1`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_bntl/MapServer/11',
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
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_bntl/MapServer/2',
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
    id: 2,
    title: {
      EN: "Planning Information",
      HE: "מידע תכנוני"
      },
      comboboxes: [{
          cb_id: 1,
          EN_name: "Plan",
          HE_name: "תוכנית",
          source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_yk_general/MapServer/16`,
          field: 'TOCHNIT'
        },
        {
          cb_id: 2,
          EN_name: "Land Use",
          HE_name: "יעוד קרקע (אופציונלי)",
          source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_yk_general/MapServer/16',
          field: 'YEUD_MEFUR1',
          filters: [{
            id: 1,
            cb_id: 1,
            field: 'TOCHNIT',
            required: true
          }]
        },
        {
          cb_id: 3,
          EN_name: "Lot",
          HE_name: "מגרש",
          source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_yk_general/MapServer/16',
          field: 'MIGRASH',
          filters: [{
            id: 1,
            cb_id: 1,
            field: 'TOCHNIT',
            required: true
          }, {
            id: 2,
            cb_id: 2,
            field: 'YEUD_MEFUR1',
            required: false
          }]
        }
      ]
    },
    {
      id: 3,
      title: {
        EN: "Property Taxes",
        HE: "ארנונה"
      },
      comboboxes: [
        {
          cb_id: 1,
          EN_name: "Asset Number",
          HE_name: "מספר נכס",
          source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_sde_modedim/MapServer/1`,
          field: 'FromAssetNum'
        },
        // {
        //   cb_id: 2,
        //   EN_name: "or: Payer Name",
        //   HE_name: "או: שם משלם",
        //   source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gue_general_vector/gue_sde_modedim/MapServer/1',
        //   field: 'PayerName'
        // },
      ]
    },
];
