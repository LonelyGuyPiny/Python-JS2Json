export default [
  // {
  //   id: 1,
  //   title: {
  //     EN: "Addresses",
  //     HE: "כתובות"
  //   },
  //   comboboxes: 
  //   [
  //     {
  //       cb_id: 1,
  //       EN_name: "Settlement",
  //       HE_name: "ישוב",
  //       source: 'https://stage1.intertown.co.il/arcgis/rest/services/rne_general_vector/rne_General/MapServer/1',
  //       field: 'ITown_SDE_NZR.ITOWN_SDE_NZR.StreetsNames.תאור',
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "House Number",
  //       HE_name: "מספר בית",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_addresses_SDE/MapServer/1',
  //       field: 'ITown_SDE_NZR.ITOWN_SDE_NZR.nzr_address.מספר_',
  //       filters:
  //       [
  //         {
  //           id: 1,
  //           cb_id: 1,
  //           field: 'ITown_SDE_NZR.ITOWN_SDE_NZR.StreetsNames.תאור',
  //           required: true
  //           },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   id: 2,
  //   title: {
  //     EN: "Cadastre",
  //     HE: "רישום מקרקעין - גוש חלקה"
  //   },
  //   comboboxes: 
  //   [ {
  //       cb_id: 1,
  //       EN_name: "Block",
  //       HE_name: "גוש",
  //       source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_cadaster/MapServer/1`,
  //       field: 'GUSH_NUM'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Parcel",
  //       HE_name: "חלקה",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_cadaster/MapServer/2',
  //       field: 'PARCEL',
  //       filters: 
  //       [
  //         {
  //         id: 1,
  //         cb_id: 1,
  //         field: 'GUSH_NUM',
  //         required: true,
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  // id: 3,
  // title: {
  //   EN: "Planning Information",
  //   HE: "מידע תכנוני"
  //   },
  //   comboboxes: [{
  //       cb_id: 1,
  //       EN_name: "Plan",
  //       HE_name: "תוכנית",
  //       source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_compilation/MapServer/1`,
  //       field: 'plan_num'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Land Use",
  //       HE_name: "יעוד קרקע (אופציונלי)",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_compilation/MapServer/8',
  //       field: 'land_desgnation_plan',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'plan_num',
  //         required: true
  //       }]
  //     },
  //     {
  //       cb_id: 3,
  //       EN_name: "Lot",
  //       HE_name: "מגרש",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_compilation/MapServer/8',
  //       field: 'lot_num',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'plan_num',
  //         required: true
  //       }, {
  //         id: 2,
  //         cb_id: 2,
  //         field: 'land_desgnation_plan',
  //         required: false
  //       }]
  //     }
  //   ]
  // },
];
