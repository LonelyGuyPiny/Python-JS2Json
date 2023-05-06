export default [
  {
    type: 'LocateAddress',
    search_id: 1,
    cb_id: 2,
    params: {
      field: 'house',
      filters: [
        {
          id: 1,
          field: 'street'
        },
      ],
    },
    basemap_slug: '',
    visibleLayers: [
      'כתובות',
    ]
  },
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
      'כל המגרשים'
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
      'תוכניות',
    ]
  },
];
