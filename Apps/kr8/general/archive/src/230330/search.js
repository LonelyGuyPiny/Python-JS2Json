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
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_general_layers/MapServer/4',
        field: 'STR_NAME',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_general_layers/MapServer/1',
        field: 'HOUSE_NUM',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'STR_FULNAM',
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_cadster_layers/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_cadster_layers/MapServer/2',
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_yk_layers/MapServer/2`,
        field: 'name'
      },
      {
        cb_id: 2,
        EN_name: "Land Use",
        HE_name: "יעוד קרקע (אופציונלי)",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_yk_layers/MapServer/2',
        field: 'purpose',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'name',
          required: true
        }]
      // },
        // cb_id: 3,
        // EN_name: "Lot",
        // HE_name: "מגרש",
        // source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/kr8_yk_layers/MapServer/1',
        // field: 'ITown_SDE_KR8_INFOPAGE_ITown_yk_Lots_1_lot_num',
        // filters: [{
        //   id: 1,
        //   cb_id: 1,
        //   field: 'ITown_SDE_KR8_INFOPAGE_ITown_yk_Plans_1_name',
        //   required: true
        // }, {
        //   id: 2,
        //   cb_id: 2,
        //   field: 'ITown_SDE_KR8_INFOPAGE_ITown_yk_Lots_1_land_use_o',
        //   required: false
        // }]
      }
    ]
  },
];
