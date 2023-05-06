export default [
  
  {
   id: 1,
     title: {
      EN: "Addresses",
       HE: "כתובות"
    },
    comboboxes: [{
        cb_id: 1,
         EN_name: "Settlement name",
         HE_name: "ישוב",
         source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_general/MapServer/1',
         field: 'MUN_HEB',
      },
      {
         cb_id: 2,
         EN_name: "street name",
         HE_name: "שם רחוב",
         source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_maagal/MapServer/2',
         field: 'STR_NAME',
         filters: [{
           cb_id: 1,
          field: 'SETL_NAME',
           required: true
         }]
       },
       {
        cb_id: 3,
         EN_name: "house number",
         HE_name: "מספר בית",
         source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_bantal/MapServer/2',
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
           required: false
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_cadaster/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_cadaster/MapServer/2',
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_compilation/MapServer/6`,
      field: 'Taba_Name'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_compilation/MapServer/6',
      field: 'Land_Use',
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
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/ehg_general_vector/ehg_compilation/MapServer/6',
      field: 'Lot_No',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'Taba_Name',
        required: true
      }, {
        id: 2,
        cb_id: 2,
        field: 'Land_Use',
        required: false
      }]
    }
  ]
},
];
