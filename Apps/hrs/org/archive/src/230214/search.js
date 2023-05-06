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
        EN_name: "Street",
        HE_name: "רחוב",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_general_layers/MapServer/4',
        field: 'Str_name',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_general_layers/MapServer/4',
        field: 'BLDG_NUM',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'Str_name',
            required: true
            },
          ]
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_cadaster/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_cadaster/MapServer/2',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_yk_ITown2/MapServer/1`,
        field: 'name'
      },
      {
        cb_id: 2,
        EN_name: "Land Use",
        HE_name: "יעוד קרקע (אופציונלי)",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_yk_ITown2/MapServer/3',
        field: 'ITown_SDE_HRS.INFOPAGE.ITown_yk_Lots.land_use_original',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'ITown_SDE_HRS.INFOPAGE.ITown_yk_Plans.name',
          required: true
        }]
      },
      {
        cb_id: 3,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_yk_ITown2/MapServer/3',
        field: 'ITown_SDE_HRS.INFOPAGE.ITown_yk_Lots.lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'ITown_SDE_HRS.INFOPAGE.ITown_yk_Plans.name',
          required: true
        }, {
          id: 2,
          cb_id: 2,
          field: 'ITown_SDE_HRS.INFOPAGE.ITown_yk_Lots.land_use_original',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_bar/MapServer/6`,
        field: 'bar_Org_Entity_Number'
      },
    ]
  },
  // {
  //   id: 5,
  //   title: {
  //     EN: "Building Requests",
  //     HE: "בקשות בניה"
  //   },
  //   comboboxes: [
  //     {
  //       cb_id: 1,
  //       EN_name: "Request Number",
  //       HE_name: "מספר בקשה",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/8',
  //       field: 'Entity_Number'
  //     },
  //     {
  //       cb_id: 2,
  //       EN_name: "or: Patitioner Name",
  //       HE_name: "או: שם מבקש",
  //       source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/8',
  //       field: 'Petitioner_People'
  //     },
  //     {
  //       cb_id: 3,
  //       EN_name: "or: Building File Number",
  //       HE_name: "או: מספר תיק בניין",
  //       source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/msg_general_vector/msg_all_plans_bar/MapServer/8`,
  //       field: 'Building_Number'
  //     },
  //   ]
  // },
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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_bar/MapServer/4',
        field: 'bar_Org_Entity_Number'
      },
      {
        cb_id: 2,
        EN_name: "or: Patitioner Name",
        HE_name: "או: שם עותר",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_bar/MapServer/4',
        field: 'bar_Petitioner_People'
      },
      {
        cb_id: 3,
        EN_name: "or: Building File Number",
        HE_name: "או: מספר תיק בניין",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/hrs_general_vector/hrs_bar/MapServer/4`,
        field: 'bar_Building_Number'
      },
    ]
  },
  {
    id: 7,
    title: {
      EN: "Call Center Records",
      HE: "קריאות מוקד"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Report Number",
        HE_name: "מספר דיווח",
        source: `https://stage1.intertown.co.il/arcgis/rest/services/hrs_general_vector/hrs_Bina/MapServer/1`,
        field: 'mainId'
      },
      {
        cb_id: 2,
        EN_name: "or: Reporter Name",
        HE_name: "או: שם מדווח",
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/hrs_general_vector/hrs_Bina/MapServer/1',
        field: 'reporterName'
      },
    ]
  },
];
