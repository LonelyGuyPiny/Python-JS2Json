export default [{
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
];
