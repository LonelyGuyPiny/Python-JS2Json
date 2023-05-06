export default [
  // {
  //   id: 1,
  //   title: {
  //     EN: "Sattalments",
  //     HE: "יישובים"
  //   },
  //   comboboxes: [
  //     {
  //       cb_id: 1,
  //       EN: "Sattalments",
  //       HE: "יישובים",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ern_general_vector/eron_cadaster/MapServer/13',
  //       field: 'HEB_NAME',
  //       },
  //     ]
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
  //       source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/ern_general_vector/eron_cadaster/MapServer/1`,
  //       field: 'GUSH_NUM'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Parcel",
  //       HE_name: "חלקה",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ern_general_vector/eron_cadaster/MapServer/1',
  //       field: 'PARCEL',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'GUSH_NUM',
  //         required: true
  //       }]
  //     }]
  // },
  // {
  //   id: 3,
  //   title: {
  //     EN: "Planning Information",
  //     HE: "מידע תכנוני"
  //   },
  //   comboboxes: [{
  //       cb_id: 1,
  //       EN_name: "Plan",
  //       HE_name: "תכנית",
  //       source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/ern_general_vector/eron_cadaster/MapServer/8`,
  //       field: 'TOCHNIT'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Land Use",
  //       HE_name: "יעוד קרקע (אופציונלי)",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ern_general_vector/eron_cadaster/MapServer/10',
  //       field: 'YEUD_MEFUR',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'TOCHNIT',
  //         required: true
  //       }]
  //     },
  //     {
  //       cb_id: 3,
  //       EN_name: "Lot",
  //       HE_name: "מגרש",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ern_general_vector/eron_cadaster/MapServer/9',
  //       field: 'MIGRASH',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'TOCHNIT',
  //         required: true
  //       }, {
  //         id: 2,
  //         cb_id: 2,
  //         field: 'YEUD_MEFUR',
  //         required: false
  //       }]
  //     }
  //   ]
  // },
];
