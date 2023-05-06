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
      'חלקות',
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
    ]
  },
  // {
  //   type: 'LocateBuildingFile',
  //   search_id: 4,
  //   cb_id: 1,
  //   params: {
  //     field: 'building_file',
  //     filters: [
  //     ],
  //   },
  //   basemap_slug: '',
  //   visibleLayers: [
  //   ]
  // },
  // {
  //   type: 'LocateBuildingRequest',
  //   search_id: 4,
  //   cb_id: 2,
  //   params: {
  //     field: 'request',
  //     filters: [
  //     ],
  //   },
  //   basemap_slug: '',
  //   visibleLayers: [
  //   ]
  // },
  // {
  //   type: 'LocateInspectionFile',
  //   search_id: 5,
  //   cb_id: 2,
  //   params: {
  //     field: 'inspection_file',
  //     filters: [
  //     ],
  //   },
  //   basemap_slug: '',
  //   visibleLayers: [
  //   ]
  // },
  {
    type: 'LocatePropertyTax',
    search_id: 4,
    cb_id: 1,
    params: {
      field: 'asset',
      filters: [
      ],
    },
    basemap_slug: '',
    visibleLayers: [

    ]
  },
  // {
  //   type: 'LocateServiceCall',
  //   search_id: 7,
  //   cb_id: 1,
  //   params: {
  //     field: 'report_num',
  //     filters: [
  //     ],
  //   },
  //   basemap_slug: '',
  //   visibleLayers: [

  //   ]
  // },
  {
    type: 'LocateWaterMeter',
    search_id: 5,
    cb_id: 1,
    params: {
      field: 'number',
      filters: [
      ],
    },
    basemap_slug: '',
    visibleLayers: [
      'מדי מים',
    ]
  },
];
