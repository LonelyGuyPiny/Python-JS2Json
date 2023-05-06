export default [
  {
    url: "https://arcgis.intertown.co.il/krg_arcgis/rest/services/yov_general_models/yov_print_general/GPServer/Export%20Web%20Map/execute",
    dpi: [
      {
        default: 96,
        min: 50,
        max: 300
      }
    ],
    scales: ['1:100', '1:250', '1:500', '1:1000', '1:2000', '1:4000', '1:8000', '1:16000', '1:32000'],
    output_formats: ['PDF', 'PNG32', 'PNG8', 'JPG', 'GIF', /*'SVG', 'SVGZ'//קבצים הניתנים לעריכה*/],
	landscape_templates: [
      {
        source: 'A4 Landscape',
        EN_text: 'A4',
        HE_text: 'A4'
      },
    ],
    portrait_templates: [
      {
        source: 'A4 Portrait',
        EN_text: 'A4',
        HE_text: 'A4'
      },
    ]
  }
]