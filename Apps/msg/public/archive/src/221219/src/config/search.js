export default [
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובות"
    },
    comboboxes: 
    [
      {
        cb_id: 1,
        EN_name: "Settlement Name",
        HE_name: "שם ישוב",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_public_site1/MapServer/1`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_public_site1/MapServer/4',
        field: 'STR_FULNAM',
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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_public_site1/MapServer/4',
        field: 'HOUSE_NUM',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'SETL_NAME',
          required: true
        }, {
          id: 2,
          cb_id: 2,
          field: 'STR_FULNAM',
          required: true
        }]
      },
      {
        cb_id: 4,
        EN_name: "or: Lot",
        HE_name: "או: מגרש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_public_site1/MapServer/23',
        field: 'lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'yeshuv_name',
          required: true
        }]
      },
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_public_site1/MapServer/7`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_public_site1/MapServer/8',
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
      EN: "Business",
      HE: "עסקים"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Business name",
        HE_name: "שם העסק",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_rama_business_public_up/MapServer/1`,
        field: 'cpview_profname'
      },
      {
        cb_id: 2,
        EN_name: "Business theme",
        HE_name: "מהות העסק",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_rama_business_public_up/MapServer/1',
        field: 'cpview_profession_descrip',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'cpview_profname',
          required: true
        }]
      }]
  },
];
