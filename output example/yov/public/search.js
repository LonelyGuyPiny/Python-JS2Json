export default [
  {
    id: 1,
    title: {
      EN: "Settlements",
      HE: "ישובים"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "ישוב",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_general_layers/MapServer/1`,
        field: 'SETL_NAME'
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
        source: `https://stage1.intertown.co.il/arcgis/rest/services/yov_general_vector/yov_cdaster/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/yov_general_vector/yov_cdaster/MapServer/2',
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_yk_ITown/MapServer/1`,
      field: 'name'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_yk_ITown/MapServer/3',
      field: 'ITown_SDE_YOV.ITOWN_INFOPAGE.ITown_yk_Lots.land_use_original',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'ITown_SDE_YOV.ITOWN_INFOPAGE.ITown_yk_Plans.name',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_yk_ITown/MapServer/3',
      field: 'ITown_SDE_YOV.ITOWN_INFOPAGE.ITown_yk_Lots.lot_num',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'ITown_SDE_YOV.ITOWN_INFOPAGE.ITown_yk_Plans.name',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'ITown_SDE_YOV.ITOWN_INFOPAGE.ITown_yk_Lots.land_use_original',
        required: false
      }]
    }
  ]
},
{
  id: 4,
  title: {
    EN: "Building Requests",
    HE: "בקשות בניה"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Building File Number",
      HE_name: "מספר תיק בניין",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_bar_SDE/MapServer/8`,
      field: 'bar_Building_Number'
    },
    {
      cb_id: 2,
      EN_name: "or: Request Number",
      HE_name: "או: מספר בקשה",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_bar_SDE/MapServer/8',
      field: 'bar_Entity_Number'
    },
    {
      cb_id: 3,
      EN_name: "or: Patitioner Name",
      HE_name: "או: שם מבקש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_bar_SDE/MapServer/8',
      field: 'bar_Petitioner_People'
    },
  ]
},
{
  id: 5,
  title: {
    EN: "Building Inspection Files",
    HE: "תיקי פיקוח בניה"
  },
  comboboxes: [
    {
      cb_id: 1,
      EN_name: "Building File Number",
      HE_name: "מספר תיק בניין",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_bar_SDE/MapServer/4`,
      field: 'bar_Building_Number'
    },
    {
      cb_id: 2,
      EN_name: "or: Inspection File Number",
      HE_name: "או: מספר תיק פיקוח",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_bar_SDE/MapServer/4',
      field: 'bar_Entity_Number'
    },
    {
      cb_id: 3,
      EN_name: "or: Patitioner Name",
      HE_name: "או: שם עותר",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_vector/yov_bar_SDE/MapServer/4',
      field: 'bar_Petitioner_People'
    },
  ]
},
];
