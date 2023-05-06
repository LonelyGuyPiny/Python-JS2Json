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
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mrm_general/MapServer/8',
        field: 'Field6',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mrm_general/MapServer/8',
        field: 'Mispar_B',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'Field6',
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mrm_general/MapServer/5`,
        field: 'Gush'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mrm_general/MapServer/5',
        field: 'Helka',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'GUSH',
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
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_yk/MapServer/7`,
        field: 'name'
      },
      {
        cb_id: 2,
        EN_name: "Land Use",
        HE_name: "יעוד קרקע (אופציונלי)",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_yk/MapServer/8',
        field: 'ITown_yk2_Lots_Compilation.land_use_original',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'ITown_yk2_Plans.name',
          required: true
        }]
      },
      {
        cb_id: 3,
        EN_name: "Lot",
        HE_name: "מגרש",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mzr_general_vector/mzr_yk/MapServer/8',
        field: 'ITown_yk2_Lots_Compilation.lot_num',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'ITown_yk2_Plans.name',
          required: true
        }, {
          id: 2,
          cb_id: 2,
          field: 'ITown_yk2_Lots_Compilation.land_use_original',
          required: false
        }]
      }
    ]
  },
];
