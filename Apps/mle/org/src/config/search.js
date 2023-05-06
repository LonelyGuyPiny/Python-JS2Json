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
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/mle_general_vector/mle_general/MapServer/3',
        field: 'STR_FULNAM',
        },
        {
        cb_id: 2,
        EN_name: "House Number",
        HE_name: "מספר בית",
        source: 'https://stage1.intertown.co.il/arcgis/rest/services/mle_general_vector/mle_general/MapServer/1',
        field: 'HOUSE_NUM',
        filters:
          [
            {
            cb_id: 1,
            field: 'STR_FULNAM',
            required: true
            },
          ]
        },
      ]
  },
  {
  id: 2,
  title: {
    EN: "Planning Information",
    HE: "מידע תכנוני"
  },
  comboboxes: [{
      cb_id: 1,
      EN_name: "Plan Code",
      HE_name: "קוד תוכנית",
      source: `https://stage1.intertown.co.il/arcgis/rest/services/mle_general_vector/mle_general/MapServer/75`,
      field: 'plan_num'
    },
    {
      cb_id: 2,
      EN_name: "Land Use",
      HE_name: "יעוד קרקע (אופציונלי)",
      source: 'https://stage1.intertown.co.il/arcgis/rest/services/mle_general_vector/mle_general/MapServer/75',
      field: 'land_desgnation_plan',
      filters: [{
        cb_id: 1,
        field: 'plan_num',
        required: true
      }]
    },
    {
      cb_id: 3,
      EN_name: "Lot",
      HE_name: "מגרש",
      source: 'https://stage1.intertown.co.il/arcgis/rest/services/mle_general_vector/mle_general/MapServer/75',
      field: 'lot_num',
      filters: [{
        cb_id: 1,
        field: 'plan_num',
        required: true
      }, {
        cb_id: 2,
        field: 'land_desgnation_plan',
        required: false
      }]
    }
  ]
},
{
  id: 3,
  title:
    {
      EN: "Business Licenses",
      HE: "רישוי עסקים"
    },
  comboboxes:
    [
      {
        cb_id: 1,
        EN_name: "Business Name",
        HE_name: "שם העסק",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_RishuyAsakim/MapServer/1',
        field: 'BUSINESS_NAME',
      }
    ]
},
{
  id: 4,
  title:
    {
      EN: "Residents",
      HE: "תושבים"
    },
  comboboxes:
    [
      {
        cb_id: 1,
        EN_name: "Last Name",
        HE_name: "שם משפחה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_populations/MapServer/5',
        field: 'מרשם_אוכלוסין_יולי_2017_שם_משפחה',
      },
      {
        cb_id: 2,
        EN_name: "and First Name",
        HE_name: "ושם פרטי",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_populations/MapServer/5',
        field: 'מרשם_אוכלוסין_יולי_2017_שם_פרטי',
        filters:
          [
            {
            cb_id: 1,
            field: 'מרשם_אוכלוסין_יולי_2017_שם_משפחה',
            required: true
            },
          ]
      },
      {
        cb_id: 3,
        EN_name: "or: ID Number",
        HE_name: "או: מספר תעודת זהות",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_populations/MapServer/5',
        field: 'מרשם_אוכלוסין_יולי_2017_תעודת_זהות',
      },
    ]
},
{
  id: 5,
  title:
    {
      EN: "Collection Data - Payer Details",
      HE: "נתוני גביה - פרטי משלם"
    },
  comboboxes:
    [
      {
        cb_id: 1,
        EN_name: "Last Name",
        HE_name: "שם משפחה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column4',
      },
      {
        cb_id: 2,
        EN_name: "and First Name",
        HE_name: "ושם פרטי",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column5',
        filters:
          [
            {
            cb_id: 1,
            field: 'Column4',
            required: true
            },
          ]
      },
      {
        cb_id: 3,
        EN_name: "or: ID Number",
        HE_name: "או: מספר תעודת זהות",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column3',
      },
      {
        cb_id: 4,
        EN_name: "or: Payer Number",
        HE_name: "או: מספר משלם",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column1',
      },
    ]
},
{
  id: 6,
  title:
    {
      EN: "Collection Data - Owner Details",
      HE: "נתוני גביה - פרטי בעלים"
    },
  comboboxes:
    [
      {
        cb_id: 1,
        EN_name: "Last Name",
        HE_name: "שם משפחה",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column11',
      },
      {
        cb_id: 2,
        EN_name: "and First Name",
        HE_name: "ושם פרטי",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column12',
        filters:
          [
            {
            cb_id: 1,
            field: 'Column11',
            required: true
            },
          ]
      },
      {
        cb_id: 3,
        EN_name: "or: ID Number",
        HE_name: "או: מספר תעודת זהות",
        source: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/mle_general_vector/mle_arnona/MapServer/1',
        field: 'Column10',
      },
    ]
},
];
