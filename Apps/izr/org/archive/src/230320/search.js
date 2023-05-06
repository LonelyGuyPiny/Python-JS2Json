export default [
  {
    id: 1,
    title: {
      EN: "Settlements-Lot",
      HE: "ישובים-מגרש"
    },
    comboboxes: [{
      cb_id: 1,
      EN_name: "Settlement",
      HE_name: "ישוב",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_BNTL/MapServer/2`,
      field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_compilation/MapServer/5',
        field: 'Lot_No',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'Settlemen1',
          required: true
        }]
      }]
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_cadaster/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_cadaster/MapServer/2',
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_compilation/MapServer/5`,
      field: 'Taba_Name'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_compilation/MapServer/5',
      field: 'Land_Use_N',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'Taba_Name',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_compilation/MapServer/5',
      field: 'Lot_No',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'Taba_Name',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'Land_Use_N',
        required: false
      }]
    }
  ]
},
{
  id: 4,
  title: {
    EN: "Arnona",
    HE: "ארנונה"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Property Number",
      HE_name: "מספר נכס",
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_Arnona/MapServer/1`,
      field: 'Property'
    },
    {
      cb_id: 2,
      EN_name: "Payer_Name",
      HE_name: "או:שם משלם",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_Arnona/MapServer/1',
      field: 'Name',
      // filters: [{
      //   id: 1,
      //   cb_id: 1,
      //   field: 'Property',
      //   required: true
      // }]
    },
    // {
    //   cb_id: 3,
    //   EN_name: "Payer_Number",
    //   HE_name: "מספר משלם",
    //   source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/izr_general_vector/izr_Arnona/MapServer/1',
    //   field: 'Payer_Num',
    //   filters: [{
    //     id: 1,
    //     cb_id: 1,
    //     field: 'Property',
    //     required: true
    //   }, {
    //     id: 2,
    //     cb_id: 2,
    //     field: 'Name',
    //     required: false
    //   }]
    // }
  ]
},
];
 