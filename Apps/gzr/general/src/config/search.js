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
        HE_name: "ישוב",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/1`,
        field: 'SETL_NAME'
      },
      // {
      //   cb_id: 2,
      //   EN_name: "Street",
      //   HE_name: "רחוב",
      //   source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/8',
      //   field: 'STR_FULNAM',
      //   filters: [{
      //     id: 1,
      //     cb_id: 1,
      //     field: 'SETL_NAME',
      //     required: true
      //   }]
      // },
      // {
      //   cb_id: 3,
      //   EN_name: "House Number",
      //   HE_name: "מספר בית",
      //   source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/8',
      //   field: 'HOUSE_NUM',
      //   filters: [{
      //     id: 1,
      //     cb_id: 1,
      //     field: 'SETL_NAME',
      //     required: true
      //   }, {
      //     id: 2,
      //     cb_id: 2,
      //     field: 'STR_FULNAM',
      //     required: true
      //   }]
      // }
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_cadaster_sde/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_cadaster_sde/MapServer/2',
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
      HE_name: "תכנית",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/1`,
      field: 'name'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/3',
      field: 'lots_land_use_original',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plans_name',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/3',
      field: 'lots_lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plans_name',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'lots_land_use_original',
        required: false
      }]
    }
  ]
},
{
  id: 4,
  title: {
    EN: "Building Files",
    HE: "תיקי בניין"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Building File Number",
      HE_name: "מספר תיק בניין",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_bar/MapServer/4`,
      field: 'bar_Org_Entity_Number'
    },
  ]
},
{
  id: 5,
  title: {
    EN: "Building Requests",
    HE: "בקשות להיתר"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Request Number",
      HE_name: "מספר בקשה",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_bar/MapServer/6',
      field: 'bar_Entity_Number'
    },
    {
      cb_id: 2,
      EN_name: "or: Patitioner Name",
      HE_name: "או: שם מבקש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_bar/MapServer/6',
      field: 'bar_Petitioner_People'
    },
    {
      cb_id: 3,
      EN_name: "or: Building File Number",
      HE_name: "או: מספר תיק בניין",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_bar/MapServer/6`,
      field: 'bar_Building_Number'
    },
  ]
},
{
  id: 6,
  title: {
    EN: "Building Inspection Files",
    HE: "תיקי פיקוח בניה"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Inspection File Number",
      HE_name: "מספר תיק פיקוח",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_pikuah/MapServer/2',
      field: 'bar_Org_Entity_Number'
    },
    {
      cb_id: 2,
      EN_name: "or: Patitioner Name",
      HE_name: "או: שם עותר",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_pikuah/MapServer/2',
      field: 'bar_Petitioner_People'
    },
    {
      cb_id: 3,
      EN_name: "or: Building File Number",
      HE_name: "או: מספר תיק בניין",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_pikuah/MapServer/2`,
      field: 'bar_Building_Number'
    },
  ]
},
{
  id: 7,
  title: {
    EN: "Assets Book",
    HE: "ספר נכסים"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Plan",
      HE_name: "תכנית",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_properties_book/MapServer/1`,
      field: 'שם_תוכנית'
    },
    {
      cb_id: 2,
      EN_name: "or: Use",
      HE_name: "או: שימוש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_properties_book/MapServer/1',
      field: 'שימוש',
    },
  ]
},
{
  id: 8,
  title: {
    EN: "Property Taxes",
    HE: "ארנונה"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Asset Number",
      HE_name: "מספר נכס",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_arnona/MapServer/16`,
      field: 'arnona_heb.prop_num'
    },
    {
      cb_id: 2,
      EN_name: "or: Payer Name",
      HE_name: "או: שם משלם",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_arnona/MapServer/16',
      field: 'beit_uziel.name'
    },
  ]
},
{
  id: 9,
  title: {
    EN: "Settlement-Lot",
    HE: "ישוב-מגרש"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Settlement",
        HE_name: "ישוב",
      source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gzr_general/MapServer/1`,
      field: 'SETL_NAME'
    },
    {
      cb_id: 2,
      EN_name: "lots",
      HE_name: "מגרש",
      source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/gzr_general_vector/gezer_yk_ITown/MapServer/3',
      field: 'lots_lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'plans_settlement',
        required: true
      }]
    }]
},
// // {
// //   id: 9,
// //   title: {
// //     EN: "Call Center Records",
// //     HE: "קריאות מוקד"
// //   },
//   comboboxes: [
    // {
    //   cb_id: 1,
    //   EN_name: "Report Number",
    //   HE_name: "מספר דיווח",
    //   source: `https://stage1.intertown.co.il/arcgis/rest/services/gzr_general_vector/gzr_Bina/MapServer/1`,
    //   field: 'mainId'
    // },
    // {
    //   cb_id: 2,
    //   EN_name: "or: Reporter Name",
    //   HE_name: "או: שם מדווח",
    //   source: 'https://stage1.intertown.co.il/arcgis/rest/services/gzr_general_vector/gzr_Bina/MapServer/1',
    //   field: 'reporterName'
    // },
  // ]
// },
];
