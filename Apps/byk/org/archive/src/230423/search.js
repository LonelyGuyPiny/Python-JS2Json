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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_address/MapServer/6',
        field: 'str_name',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_address/MapServer/0',
        field: 'house_num',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'street_name',
            required: true
            },
          ]
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
      source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_cadaster/MapServer/1`,
      field: 'GUSH_NUM'
    },
    {
      cb_id: 2,
      EN_name: "Parcel",
      HE_name: "חלקה",
      source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/byk_general_vector/byk_cadaster/MapServer/2',
      field: 'PARCEL',
      filters: [{
        id: 1,
        cb_id: 1,
        field: 'GUSH_NUM',
        required: true
      }]
    }]
},
];
