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
        field: 'STR_FULNAM',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_cadaster/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_cadaster/MapServer/2',
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
      EN: "Arnona",
      HE: "ארנונה"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Asset Number",
        HE_name: "מס נכס",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_arnona/MapServer/3`,
        field: 'מס_נכס'
      },
      {
        cb_id: 2,
        EN_name: "or: Payer Name",
        HE_name: "או: שם משלם",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_arnona/MapServer/2',
        field: 'שם_משלם'
      },
    ]
  },
  {
    id: 4,
    title: {
      EN: "Arnona measurement",
      HE: "ארנונה מדידות"
    },
    comboboxes: [
      {
        cb_id: 2,
        EN_name: "or: Payer Name",
        HE_name: "או: שם משלם",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nsr_general_vector/nsr_arnona/MapServer/7',
        field: 'Payer_name'
      },
    ]
  },
];