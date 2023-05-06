export default [
  // {
  //   type: 'LocateAddress',
  //   search_id: 1,
  //   cb_id: 3,
  //   params: {
  //     field: 'house',
  //     filters: [
  //       {
  //         id: 1,
  //         field: 'settlement'
  //       },
  //       {
  //         id: 2,
  //         field: 'street'
  //       },
  //     ],
  //   },
  //   basemap_slug: '',
  //   visibleLayers: [
  //     'כתובות',
  //   ]
  // },
  {
    type: 'LocateParcel',
    search_id: 2,
    cb_id: 2,
    params: {
      field: 'parcel',
      filters: [
        {
          id: 1,
          field: 'block'
        },
      ],
    },
    basemap_slug: '',
    visibleLayers: [
      'חלקות מרץ 2021',
    ]
  },
  {
    type: 'LocateLot',
    search_id: 3,
    cb_id: 3,
    params: {
      field: 'lot',
      filters: [
        {
          id: 1,
          field: 'plan'
        },
      ],
    },
    basemap_slug: '',
    visibleLayers: [
      
    ]
  },
  {
    type: 'LocatePlan',
    search_id: 3,
    cb_id: 1,
    params: {
      field: 'plan',
      filters: [
      ],
    },
    basemap_slug: '',
    visibleLayers: [
      'קווים כחולים',
    ]
  },
  {
    type: 'LocatePropertyTax',
    search_id: 5,
    cb_id: 2,
    params: {
      field: 'asset',
      filters: [
      ],
    },
    basemap_slug: '',
    visibleLayers: [

    ]
  },
];
