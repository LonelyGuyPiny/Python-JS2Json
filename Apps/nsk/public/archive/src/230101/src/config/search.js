export default [
  // {
  //   id: 1,
  //   title: {
  //     EN: "Addresses",
  //     HE: "כתובות - ישובי שורקות"
  //   },
  //   comboboxes: [{
  //       cb_id: 1,
  //       EN_name: "Settlement",
  //       HE_name: "יישוב",
  //       source: `https://stage1.intertown.co.il/arcgis/rest/services/srk_general_vector/srk_general/MapServer/7`,
  //       field: 'SETL_NAME'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "Street",
  //       HE_name: "רחוב",
  //       source: 'https://stage1.intertown.co.il/arcgis/rest/services/srk_general_vector/srk_general/MapServer/6',
  //       field: 'STR_NAME',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'SETL_NAME',
  //         required: true
  //       }]
  //     },
  //     {
  //       cb_id: 3,
  //       EN_name: "House Number",
  //       HE_name: "מספר בית",
  //       source: 'https://stage1.intertown.co.il/arcgis/rest/services/srk_general_vector/srk_general/MapServer/5',
  //       field: 'HOUSE_NUM',
  //       filters: [{
  //         id: 1,
  //         cb_id: 1,
  //         field: 'SETL_NAME',
  //         required: true
  //       }, {
  //         id: 2,
  //         cb_id: 2,
  //         field: 'STR_NAME',
  //         required: true
  //       }]
  //     }
  //   ]
  // },
  {
    id: 2,
    title: {
      EN: "Cadastre",
      HE: "גוש וחלקה - שורקות"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Block Number",
        HE_name: "מספר גוש",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_general_public/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel Number",
        HE_name: "מספר חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_general_public/MapServer/2',
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
    HE: "מידע תכנוני - שורקות"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Plan",
      HE_name: "תוכנית",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_general_public/MapServer/5`,
      field: 'taba_t.plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_general_public/MapServer/6',
      field: 'compilation.land_desgnation_plan',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'taba_t.plan_num',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsk_general_vector/nsk_general_public/MapServer/6',
      field: 'compilation.lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'taba_t.plan_num',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'compilation.land_desgnation_plan',
        required: false
      }]
    }]
  },
];
