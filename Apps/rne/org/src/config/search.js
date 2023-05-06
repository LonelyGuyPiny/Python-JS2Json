export default [
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובות"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "שם ישוב",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_bntl_maagal/MapServer/1`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Street",
        HE_name: "שם רחוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_bntl_maagal/MapServer/2',
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
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_bntl_maagal/MapServer/2',
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
      EN: "Cadastre",
      HE: "רישום מקרקעין - גוש חלקה"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Block",
        HE_name: "גוש",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_mapi_parcel/MapServer/1`,
        field: 'Gush'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/rne_mapi_parcel/MapServer/1',
        field: 'Helka',
        filters: [{
          cb_id: 1,
          field: 'Gush',
          required: true
        }]
      }]
  },
  // {
  //   id: 3,
  //   title: {
  //     EN: "Planning Information",
  //     HE: "מידע תכנוני"
  //   },
  //   comboboxes: [{
  //       cb_id: 1,
  //       EN_name: "Plan",
  //       HE_name: "תוכנית",
  //       source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/9`,
  //       field: 'plan_num'
  //     },
  //   ]
  // },
  //     {
  //       id: 4,
  //       title: {
  //         EN: "Cadastre",
  //         HE: "מידע תכנוני לפי תוכנית-מגרש"
  //       },
  //       comboboxes: [{
  //         cb_id: 1,
  //         EN_name: "Plan",
  //         HE_name: "תוכנית",
  //         source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/7`,
  //         field: 'plan'
  //         },
  //         {
  //           cb_id: 2,
  //           EN_name: "lot",
  //           HE_name: "מגרש",
  //           source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/btv_general_vector/btv_yk_compilation/MapServer/7',
  //           field: 'lot_num',
  //           filters: [{
  //             cb_id: 1,
  //             field: 'plan',
  //             required: true
  //           }]
  //         }]
  //     },
];