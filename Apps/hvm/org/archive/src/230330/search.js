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
        EN_name: "Settlement",
        HE_name: "יישוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_general/MapServer/6',
        field: 'Vaad_Heb',
        },
        // {
        // cb_id: 2,
        // EN_name: "House Number",
        // HE_name: "מספר בית",
        // source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_general/MapServer/1',
        // field: 'HOUSE_NUM',
        // filters:
        //   [
        //     {
        //     id: 1,
        //     cb_id: 1,
        //     field: 'STR_NAME',
        //     required: true
        //     },
        //   ]
        // },
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_cadaster_sde/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_cadaster_sde/MapServer/2',
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
      EN: "Plans",
      HE: "תכניות"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Plans",
        HE_name: "תכניות",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_yk_ITown/MapServer/1',
        field: 'name',
        },
      ]
    },
  {
    id: 4,
    title: {
      EN: "Plans-Lot",
      HE: "תכנית-מגרש"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "plan number",
        HE_name: "מספר תכנית",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_yk_ITown/MapServer/1`,
        field: 'name'
      },
      {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_yk_ITown/MapServer/3',
        field: 'lots_lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'plans_name',
          required: true
        }]
      }]
  },
  {
    id: 5,
    title: {
      EN: "Compilation",
      HE: "יישוב-מגרש"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "settlement",
        HE_name: "יישוב",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_yk_ITown/MapServer/4`,
        field: 'plans_settlement'
      },
      {
        cb_id: 2,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/hvm_general_vector/hvm_Tichnon_Info/MapServer/13',
        field: 'lots_lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'plans_settlement',
          required: true
        }]
      }]
  },
];
