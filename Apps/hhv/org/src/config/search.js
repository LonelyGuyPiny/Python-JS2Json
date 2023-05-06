export default [
  {
  id: 1,
  title: {
    EN: "Planning Information",
    HE: "מידע תכנוני"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Plan",
        HE_name: "תוכנית",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/hhv_yeshuvim_vector/hhv_yeshuvim_yk_general/MapServer/3`,
        field: 'blue_lines_code_taba'
      },
      // {
      //   cb_id: 2,
      //   EN_name: "Land Use",
      //   HE_name: "יעוד קרקע (אופציונלי)",
      //   source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_yk_compilation/MapServer/11',
      //   field: 'land_desgnation_plan',
      //   filters: [{
      //     id: 1,
      //     cb_id: 1,
      //     field: 'plan_num',
      //     required: true
      //   }]
      // },
      // {
      //   cb_id: 3,
      //   EN_name: "Lot",
      //   HE_name: "מגרש",
      //   source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_yk_compilation/MapServer/11',
      //   field: 'lot_num',
      //   filters: [{
      //     id: 1,
      //     cb_id: 1,
      //     field: 'plan_num',
      //     required: true
      //   }, {
      //     id: 2,
      //     cb_id: 2,
      //     field: 'land_desgnation_plan',
      //     required: false
      //   }]
      // }
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/hhv_general_vector/hhv_EPR/MapServer/1`,
        field: 'ITown_SDE_HHV.ITOWN_SDE_HHV.aset_num.mzm_num_ID'
      },
      {
        cb_id: 2,
        EN_name: "or: Payer Name",
        HE_name: "או: שם משלם",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hhv_general_vector/hhv_EPR/MapServer/1',
        field: 'ITown_SDE_HHV.ITOWN_SDE_HHV.hhv_epr_src.PayerName'
      },
      {
        cb_id: 3,
        EN_name: "or: Owner Name",
        HE_name: "או: שם בעלים",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hhv_general_vector/hhv_EPR/MapServer/1',
        field: 'ITown_SDE_HHV.ITOWN_SDE_HHV.hhv_epr_src.OwnName'
      },
    ]
  },
  {
    id: 2,
    title: {
      EN: "Sattelment-Lot",
      HE: "ישוב-מגרש"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Sattelment",
        HE_name: "ישוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/hhv_general_vector/hhv_general_layers/MapServer/1',
        field: 'SETL_NAME',
        },
        {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/yosh_general_vector/yosh_minhal_layers/MapServer/4',
        field: 'MIGRASH_NU',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'SETL_NAME',
            required: true
            },
          ]
        },
      ]
  },
];
