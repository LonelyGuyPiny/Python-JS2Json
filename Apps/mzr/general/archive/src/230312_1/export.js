export default [
  {
    url: "https://arcgis8.intertown.co.il/arcgis107/rest/services/itown_utils/Printing/GPServer/ExportWebMap/execute",
    dpi: [
      {
        default: 96,
        min: 50,
        max: 300
      }
    ],
    scales: ['1:100', '1:250', '1:500', '1:1000', '1:1250', '1:2500', '1:5000', '1:10000', '1:20000'],
    output_formats: ['PDF', 'PNG32', 'PNG8', 'JPG', 'GIF', /*'SVG', 'SVGZ'//קבצים הניתנים לעריכה*/],
	landscape_templates: [
    {
      source: 'mzr_A0_Landscape',
      EN_text: 'A0',
      HE_text: 'A0'
    },
    {
      source: 'mzr_A1 Landscape',
      EN_text: 'A1',
      HE_text: 'A1'
    },
    {
      source: 'mzr_A2 Landscape',
      EN_text: 'A2',
      HE_text: 'A2'
    },
    {
      source: 'mzr_A3 Landscape',
      EN_text: 'A3',
      HE_text: 'A3'
    },
    {
      source: 'mzr_A4 Landscape',
      EN_text: 'A4',
      HE_text: 'A4'
    },
    ],
    portrait_templates: [
      {
        source: 'mzr_A0_Portrait',
        EN_text: 'A0',
        HE_text: 'A0'
      },
      {
        source: 'mzr_A1_Portrait',
        EN_text: 'A1',
        HE_text: 'A1'
      },
      {
        source: 'mzr_A2_Portrait',
        EN_text: 'A2',
        HE_text: 'A2'
      },
      {
        source: 'mzr_A3 Portrait',
        EN_text: 'A3',
        HE_text: 'A3'
      },
      {
        source: 'mzr_A4 Portrait',
        EN_text: 'A4',
        HE_text: 'A4'
      },
    ]
  }
]