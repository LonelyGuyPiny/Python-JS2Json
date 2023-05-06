export default [
  {
    id: 1,
    title: {
      EN: "Addresses",
      HE: "כתובת"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Settlement",
        HE_name: "יישוב",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/mgd_general_vector/mgd_general/MapServer/2`,
        field: 'SETL_NAME'
      },
      {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית (קיים רק בגבעת עוז, עין העמק ועין השופט)",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mgd_general_vector/mgd_general/MapServer/5',
        field: 'HOUSE_NUM',
        filters: [{
          id: 1,
          cb_id: 1,
          field: 'SETL_NAME',
          required: true
        }]
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
        EN_name: "Block Number",
        HE_name: "מספר גוש",
        source: `https://arcgis.intertown.co.il/krg_arcgis/rest/services/mgd_general_vector/mgd_cadaster1/MapServer/1`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Parcel Number",
        HE_name: "מספר חלקה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mgd_general_vector/mgd_cadaster1/MapServer/2',
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
