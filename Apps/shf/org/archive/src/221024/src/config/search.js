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
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/shf_general_vector/shf_General/MapServer/0',
        field: 'StreetName',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/shf_general_vector/shf_General/MapServer/1',
        field: 'TEXTSTRING',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'StreetName',
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
        source: `https://stage1.intertown.co.il/arcgis/rest/services/shf_general_vector/shf_Cadastre/MapServer/0`,
        field: 'GUSH'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקות מקור",
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/shf_general_vector/shf_Cadastre/MapServer/1',
        field: 'Helka',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'GUSH',
          required: true
        }]
      }]
    },
 ];
