export default [
  {
    id: 1,
    title: {
      EN: "Settlement Name-LOT",
      HE: "יישוב-מגרש"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement Name",
        HE_name: "שם ישוב",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_bntl_layers/MapServer/1`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_yk_compilation/MapServer/12',
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
      EN: "Addresses",
      HE: "כתובות"
    },
    comboboxes: 
    [
      {
        cb_id: 1,
        EN_name: "Settlement Name",
        HE_name: "שם ישוב",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_bntl_layers/MapServer/1`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_bntl_layers/MapServer/10',
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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_bntl_layers/MapServer/2',
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
    ]
  },
  {
    id: 3,
    title: {
      EN: "Cadastre",
      HE: "רישום מקרקעין - גוש חלקה"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Block",
        HE_name: "גוש",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_cadaster/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_cadaster/MapServer/2',
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
  id: 4,
  title: {
    EN: "Planning Information",
    HE: "מידע תכנוני"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Plan",
        HE_name: "תוכנית",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_yk_compilation/MapServer/5`,
        field: 'plan_num'
      },
      {
        cb_id: 2,
        EN_name: "Land Use",
        HE_name: "יעוד קרקע (אופציונלי)",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_yk_compilation/MapServer/11',
        field: 'land_desgnation_plan',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'plan',
          required: true
        }]
      },
      {
        cb_id: 3,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_yk_compilation/MapServer/11',
        field: 'lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'plan',
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
  {
    id: 5,
    title: {
      EN: "Building Files",
      HE: "תיקי בניין"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Building File Number",
        HE_name: "מספר תיק בניין",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/6`,
        field: 'Org_Entity_Number'
      },
    ]
  },
  {
    id: 5,
    title: {
      EN: "Building Requests",
      HE: "בקשות בניה"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Request Number",
        HE_name: "מספר בקשה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/8',
        field: 'Entity_Number'
      },
      {
        cb_id: 2,
        EN_name: "or: Patitioner Name",
        HE_name: "או: שם מבקש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/8',
        field: 'Petitioner_People'
      },
      {
        cb_id: 3,
        EN_name: "or: Building File Number",
        HE_name: "או: מספר תיק בניין",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/8`,
        field: 'Building_Number'
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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/4',
        field: 'Org_Entity_Number'
      },
      {
        cb_id: 2,
        EN_name: "or: Patitioner Name",
        HE_name: "או: שם עותר",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/4',
        field: 'Petitioner_People'
      },
      {
        cb_id: 3,
        EN_name: "or: Building File Number",
        HE_name: "או: מספר תיק בניין",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/4`,
        field: 'Building_Number'
      },
    ]
  },
  {
    id: 7,
    title: {
      EN: "Assets Book",
      HE: "ספר נכסים"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Asset Number",
        HE_name: "מספר נכס",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/10',
        field: 'Estate_Number',
      },
      {
        cb_id: 2,
        EN_name: "or: Use",
        HE_name: "או: שימוש",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/10`,
        field: 'Uses'
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_arnona_layer1/MapServer/1`,
        field: 'מס_נכס'
      },
      {
        cb_id: 2,
        EN_name: "or: Payer Name",
        HE_name: "או: שם משלם",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_arnona_layer1/MapServer/1',
        field: 'שם_משלם'
      },
      {
        cb_id: 3,
        EN_name: "or: Owner Name",
        HE_name: "או: שם בעלים",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_arnona_layer1/MapServer/1',
        field: 'assetOwner'
      },
    ]
  },
  {
    id: 9,
    title: {
      EN: "Call Center Records",
      HE: "קריאות מוקד"
    },
    comboboxes: [
      // {
      //   cb_id: 1,
      //   EN_name: "Report Number",
      //   HE_name: "מספר דיווח",
      //   source: `https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_Bina/MapServer/1`,
      //   field: 'mainId'
      // },
      // {
      //   cb_id: 2,
      //   EN_name: "or: Reporter Name",
      //   HE_name: "או: שם מדווח",
      //   source: 'https://stage1.intertown.co.il/arcgis/rest/services/msg_general_vector/msg_Bina/MapServer/1',
      //   field: 'reporterName'
      // },
    ]
  },
];
