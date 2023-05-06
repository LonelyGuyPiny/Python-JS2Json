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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_general/MapServer/3',
        field: 'STR_NAME',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_general/MapServer/3',
        field: 'HOUSE_NUM',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'STR_NAME',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_cadaster/MapServer/3`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_cadaster/MapServer/3',
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
