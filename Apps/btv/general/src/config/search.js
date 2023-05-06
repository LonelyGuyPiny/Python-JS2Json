export default [
  {
    id: 1,
    title: {
      EN: "settlements",
      HE: "ישובים"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement Name",
        HE_name: "שם ישוב",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/7`,
        field: 'yeshuv_name'
      },
      {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/7',
        field: 'lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'yeshuv_name',
          required: true
        }]
      }]
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_cadaster/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_cadaster/MapServer/2',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/1`,
        field: 'plan_name'
      },
      {
        cb_id: 2,
        EN_name: "Land Use",
        HE_name: "יעוד קרקע (אופציונלי)",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/9',
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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/9',
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
      }
    ]
  },
];