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
        EN_name: "Sttlement",
        HE_name: "שם ישוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_general/MapServer/3',
        field: 'SETL_NAME',
        },
        {
        cb_id: 2,
        EN_name: "Street Name",
        HE_name: "שם רחוב",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_general/MapServer/3',
        field: 'STR_NAME',
        filters:
          [
            {
            id: 1,
            cb_id: 1,
            field: 'SETL_NAME',
            required: true
            },
          ]
        },
        {
          cb_id: 3,
          EN_name: "House Number",
          HE_name: "מספר בית",
          source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_general/MapServer/3',
          field: 'HOUSE_NUM',
          filters: [{
            id: 1,
            cb_id: 1,
            field: 'SETL_NAME',
            required: false
          }, {
            id: 2,
            cb_id: 2,
            field: 'STR_NAME',
            required: false
          }]
        }
      ]
  },
  // {
  //   id: 2,
  //   title: {
  //     EN: "valve control",
  //     HE: "מגופים שולטים"
  //   },
  //   comboboxes: [
  //     {
  //       cb_id: 1,
  //       EN_name: "Sttlement",
  //       HE_name: "שם ישוב",
  //       source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_Infra/MapServer/16',
  //       field: 'ISHUV',
  //       },
  //       {
  //       cb_id: 2,
  //       EN_name: "Street Name",
  //       HE_name: "שם רחוב",
  //       source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_Infra/MapServer/16',
  //       field: 'street_name',
  //       filters:
  //         [
  //           {
  //           id: 1,
  //           cb_id: 1,
  //           field: 'ISHUV',
  //           required: true
  //           },
  //         ]
  //       },
  //       {
  //         cb_id: 3,
  //         EN_name: "valve Number",
  //         HE_name: "מספר בית",
  //         source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_Infra/MapServer/16',
  //         field: 'house_num',
  //         filters: [{
  //           id: 1,
  //           cb_id: 1,
  //           field: 'ISHUV',
  //           required: true
  //         }, {
  //           id: 2,
  //           cb_id: 2,
  //           field: 'street_name',
  //           required: true
  //         }]
  //       }
  //     ]
  // },
  {
    id: 3,
    title: {
      EN: "Gush Helka",
      HE: "גוש חלקה"
    },
    comboboxes: [{
        cb_id: 1,
        EN_name: "Gush",
        HE_name: "גוש",
        source: `https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_general/MapServer/2`,
        field: 'GUSH_NUM'
      },
      {
        cb_id: 2,
        EN_name: "Helka",
        HE_name: "חלקה",
        source: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/mnm_general_vector/mnm_general/MapServer/1',
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