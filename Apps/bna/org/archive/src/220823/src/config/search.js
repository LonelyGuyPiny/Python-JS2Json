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
  //       EN_name: "Settlement Name",
  //       HE_name: "שם ישוב",
  //       source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_general/MapServer/1`,
  //       field: 'SETTL_NAME'
  //     },
  //   ]
  // },
  // {
  //   id: 2,
  //   title: {
  //     EN: "Cadastre",
  //     HE: "רישום מקרקעין - גוש חלקה"
  //   },
  //   comboboxes: [{
  //       cb_id: 1,
  //       EN_name: "Block",
  //       HE_name: "גוש",
  //       source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_cadaster/MapServer/1`,
  //       field: 'GUSH_NO'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Parcel",
  //       HE_name: "חלקה",
  //       source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_cadaster/MapServer/2',
  //       field: 'PARCEL',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'GUSH_NO',
  //         required: true
  //       }]
  //     }]
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
  //       source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_minhal/MapServer/36`,
  //       field: 'NAME'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Land Use",
  //       HE_name: "יעוד קרקע (אופציונלי)",
  //       source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_minhal/MapServer/36',
  //       field: 'DESCRIPTIO',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'NAME',
  //         required: true
  //       }]
  //     },
  //     {
  //       cb_id: 3,
  //       EN_name: "Lot",
  //       HE_name: "מגרש",
  //       source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/bhy_general_vector/bhy_minhal/MapServer/36',
  //       field: 'MIGRASH_NU',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'NAME',
  //         required: true
  //       }, {
  //         id: 2,
  //         cb_id: 2,
  //         field: 'DESCRIPTIO',
  //         required: false
  //       }]
  //     }
  //   ]
  // },
];
