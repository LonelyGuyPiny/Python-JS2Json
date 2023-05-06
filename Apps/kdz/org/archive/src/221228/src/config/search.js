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
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_general/MapServer/2',
        field: 'STR_NAME',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_general/MapServer/1',
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
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_cadaster/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel",
        HE_name: "חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_cadaster/MapServer/2',
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
      EN: "Assets Book",
      HE: "ספר נכסים"
    },
    comboboxes: [
      {
        cb_id: 1,
        EN_name: "Asset Number",
        HE_name: "מספר נכס",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_asset/MapServer/1',
        field: 'קדימה_צורן___דוח_נכסים___01012018_csv_מספר',
      },
      {
        cb_id: 2,
        EN_name: "or: Use",
        HE_name: "או: שימוש",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/kdz_general_vector/kdz_asset/MapServer/1`,
        field: 'קדימה_צורן___דוח_נכסים___01012018_csv_שימו'
      },
    ]
  },
];
