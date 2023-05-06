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
        EN_name: "Settlement",
        HE_name: "יישוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_general/MapServer/1',
        field: 'SETTL_NAME',
        },
        // {
        // cb_id: 2,
        // EN_name: "House Number",
        // HE_name: "מספר בית",
        // source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_general/MapServer/1',
        // field: 'HOUSE_NUM',
        // filters:
        //   [
        //     {
        //     id: 1,
        //     cb_id: 1,
        //     field: 'STR_NAME',
        //     required: true
        //     },
        //   ]
        // },
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_cadaster/MapServer/1`,
        field: 'GUSH_NO'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_cadaster/MapServer/2',
        field: 'PARCEL',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'GUSH_NO',
          required: true
        }]
      }]
  },
  {
    id: 3,
    title: {
      EN: "Plans",
      HE: "תכניות"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Plans",
        HE_name: "תכניות",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_plans/MapServer/1',
        field: 'plan_num',
        },
      ]
    },
  {
    id: 4,
    title: {
      EN: "Plans-Lot",
      HE: "תכנית-מגרש"
    },
    comboboxes: [{
      cb_id: 1,
      EN_name: "Plans",
      HE_name: "תכניות",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_plans/MapServer/1',
      field: 'plan_num',
      },
      {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_plans/MapServer/6',
        field: 'lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'plan',
          required: true
        }]
      }]
  },
  // {
  //   id: 5,
  //   title: {
  //     EN: "Compilation",
  //     HE: "יישוב-מגרש"
  //   },
  //   comboboxes: [{
  //     cb_id: 1,
  //     EN_name: "Settlement",
  //     HE_name: "יישוב",
  //     source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_general/MapServer/1',
  //     field: 'SETTL_NAME',
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Lot",
  //       HE_name: "מגרש",
  //       source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_plans/MapServer/6',
  //       field: 'lot_num',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'plan',
  //         required: true
  //       }]
  //     }]
  // },
];
